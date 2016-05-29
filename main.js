Messages = new Mongo.Collection("messages")
Chatrooms = new Mongo.Collection("chatrooms")

Router.route('/', function() {
    this.render('home')
})

if (Meteor.isClient) {
    Meteor.startup(function() {
        Meteor.subscribe('lastTenMessages', 20)
    })

    Template.guestBook.helpers({
        messages() {
            return Messages.find({}, {sort: {createdAt: -1}})
        }
    })

    Template.guestBook.events({
        "submit form": (e, t) => {
            e.preventDefault()
            let text = $(e.target).find("#inputMessage").val()
            $("input").val("")
            let message = {text}
            Meteor.call("createMessage", message)
        }
    })

    Template.home.helpers({
        chatrooms() {
            return Chatrooms.find({}, {sort: {createdAt: -1}})
        }
    })

    Template.home.events({
        "submit form": (e, t) => {
            e.preventDefault()
            let chatroomName = $(e.target).find("#createChatroom").val()
            $("input").val("")
            let chatroom = {chatroomName}
            Meteor.call("createChatroom", chatroom)
        }
    })
}

if (Meteor.isServer) {
    Meteor.publish('lastTenMessages', (limit) => {
        return Messages.find({}, {sort: {createdAt: -1}, limit})
    })

    Meteor.publish(null, () => {
        return Chatrooms.find()
    })

    Meteor.methods({
        createMessage(message) {
            let user = Meteor.userId()
            if (user) {
                message.user = Meteor.user().emails[0].address
                message.createdAt = new Date()
                Messages.insert(message)
            }
        },

        createChatroom(chatroom) {
            let user = Meteor.userId
            if (user) {
                chatroom.user = Meteor.user().emails[0].address
                chatroom.createdAt = new Date()
                Chatrooms.insert(chatroom)
            }
        }
    })
}
