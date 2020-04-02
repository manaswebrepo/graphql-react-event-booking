const Event = require("../../models/event");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.inputEvent.title,
      description: args.inputEvent.description,
      price: +args.inputEvent.price,
      date: new Date(args.inputEvent.date),
      creator: "5e83229a55037f21d280374f"
    });
    let createdEvent;
    try {
      const result = await event.save();

      createdEvent = transformEvent(result);
      const creator = await User.findById("5e83229a55037f21d280374f");

      if (!creator) {
        throw new Error("User not found");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
    }
  }
};
