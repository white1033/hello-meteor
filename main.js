if (Meteor.isClient) {
    Template.message.helpers({
        
    })

    Template.body.helpers({
        messages: [
            "Hello Meteor! (m1)",
            "Hello Meteor! (m2)",
            "Hello Meteor! (m3)"
        ]
    })
}
