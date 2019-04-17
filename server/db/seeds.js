use bucket_list;

db.dropDatabase();

db.items.insertMany([
  {
    item: "Wrestle a bear"
  },
  {
    item: "Climb Everest"
  },
  {
    item: "Build a successful app"
  },
  {
    item: "Make a rap album"
  }
]);
