Messages = new Mongo.Collection("messages");

sampleMessages = [
    {text: "Hello Meteor! (m1)"},
    {text: "Hello Meteor! (m2)"},
    {text: "Hello Meteor! (m3)"}
]

if (Meteor.isClient) {
    Template.body.helpers({
        messages: sampleMessages
    })
}
