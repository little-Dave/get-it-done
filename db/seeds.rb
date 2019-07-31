# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: "test", name: "Paul")
User.create(username: "testing", name: "Mike")
User.create(username: "tested", name: "Dan")

Project.create(name: "Mod 3 project", description: "Asynchronous SPA using vJS and Rails", notes: "Make a plan and stick to it, making accommodations where needed.", user_id: 2)
Project.create(name: "Denver Coffee", description: "Backburner no more", notes: "Measure twice, cut once", user_id: 3)
Project.create(name: "Other Thing", description: "you know, that other thing", notes: "revise and implement", user_id: 3)
Project.create(name: "Next Thing", description: "you know, the NEXT thing", notes: "revise and implement", user_id: 3)
Project.create(name: "My Thing", description: "oh yea, that's my thing", notes: "revise and implement", user_id: 3)
Project.create(name: "Those Things", description: "you know, those other things", notes: "revise and implement", user_id: 3)