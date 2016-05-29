Messages = new Mongo.Collection("messages")
Chatrooms = new Mongo.Collection("chatrooms")

Router.map(function() {
    this.route('index', {
        path: '/',
        template: 'home'
    })

    this.route('chatroom', {
        path: '/chatroom/:_id',
        template: 'chatroomDetail',
        data: function() {
            res = {chatroomId: () => this.params._id}
            return res
        },
        waitOn: function() {
            Meteor.subscribe('chatroomMessages', this.params._id)
        }
    })
})

if (Meteor.isClient) {
    Template.guestBook.helpers({
        messages() {
            return Messages.find({}, {sort: {createdAt: -1}})
        }
    })

    Template.guestBook.events({
        "submit form": (e, t) => {
            e.preventDefault()
            chatroomId = Router.current().params._id
            let text = $(e.target).find("#inputMessage").val()
            $("input").val("")
            let message = {text, chatroomId}
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

    Meteor.publish('chatroomMessages', function(chatroomId) {
        return Messages.find({chatroomId})
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
