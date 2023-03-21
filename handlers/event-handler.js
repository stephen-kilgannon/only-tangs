const { connect, disconnect } = require('../util/connect');
const { Event } = require('../model/events');
var logger = require('morgan');

class EventRepository {

    constructor() {
        connect();
    }

    async getEvent() {
        const events = await Event.find({});
        console.log('events:::', events);
        return events;
    }

    async createEvent(event) {
        let data = {};
        try {
            data = await Event.create(event);
        } catch(err) {
            console.log('Error::' + err);
        }
        return data;
    }

    async updateEvent(event,body) {
        let data = {};
        try {
            data = await Event.updateOne(
               { "_id" : event },
               { $set: { "eventname" : body.eventname,"name": body.name, updatedAt: Date.now()}}
            );
         } catch (e) {
            print(e);
         }
        return data;
    }

    async deleteEvent(Id) {
        let data = {};
        try {
            data = await Event.deleteOne({_id : Id});
        } catch(err) {
            console.log('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

    async deleteAll() {
        let data = {};
        try {
            data = await Event.deleteMany({});
        } catch(err) {
            console.log('Error::' + err);
        }
        return data;
    }

}

module.exports = new EventRepository();