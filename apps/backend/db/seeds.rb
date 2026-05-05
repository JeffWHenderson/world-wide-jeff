users = [
  {
    username: "jeff",
    display_name: "Jeff Henderson",
    bio: "Building things on the internet.",
    top_friends: ["waller", "tom", "audry", "maya", "ricky", "dana", "chris", "sam"],
    custom_style: {},
    password: "secretPassword"
  },
  {
    username: "waller",
    display_name: "Waller Goble",
    bio: "Professional chaos agent.",
    top_friends: ["jeff", "tom", "audry"],
    custom_style: { "backgroundColor" => "#1a0033", "textColor" => "#e8d5ff", "accentColor" => "#9b59b6", "headerBg" => "#2d0052" },
    password: "password"
  },
  {
    username: "tom",
    display_name: "Tom",
    bio: "Everyone's first friend.",
    top_friends: [],
    custom_style: { "backgroundColor" => "#003366", "textColor" => "#cce5ff", "accentColor" => "#4488cc", "headerBg" => "#00204a" },
    password: "password"
  },
  {
    username: "audry",
    display_name: "Audry",
    bio: "Living my best life ✨",
    top_friends: ["jeff", "waller"],
    custom_style: { "backgroundColor" => "#ffe0ec", "textColor" => "#4a0020", "accentColor" => "#cc0044", "headerBg" => "#ffb3cc" },
    password: "password"
  },
  { username: "maya",  display_name: "Maya",  bio: "",             top_friends: [], custom_style: {}, password: "password" },
  { username: "ricky", display_name: "Ricky", bio: "Just vibing.", top_friends: [], custom_style: {}, password: "password" },
  { username: "dana",  display_name: "Dana",  bio: "",             top_friends: [], custom_style: {}, password: "password" },
  { username: "chris", display_name: "Chris", bio: "",             top_friends: [], custom_style: {}, password: "password" },
  { username: "sam",   display_name: "Sam",   bio: "",             top_friends: [], custom_style: {}, password: "password" },
]

users.each do |attrs|
  User.find_or_create_by!(username: attrs[:username]) do |u|
    u.display_name = attrs[:display_name]
    u.bio          = attrs[:bio]
    u.top_friends  = attrs[:top_friends]
    u.custom_style = attrs[:custom_style]
    u.password     = attrs[:password]
  end
end
