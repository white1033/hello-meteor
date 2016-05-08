if (Meteor.isClient) {
    Template.message.helpers({

    })

    Template.body.helpers({
        messages: [
            {text: "Hello Meteor! (m1)", num: 1},
            {text: "Hello Meteor! (m2)", num: 2},
            {text: "Hello Meteor! (m3)", num: 4}
        ]
    })
}
