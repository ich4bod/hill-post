export const levels = [
 {"id":"contour","title":"Take the contour","brief":"The ridge is short. The valley saves your legs.","start":"s","goal":"t","distanceBudget":8,"climbBudget":1,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"h","name":"Ridge","x":50,"y":18,"height":4},{"id":"t","name":"Cafe","x":88,"y":48,"height":0},{"id":"a","name":"Mill","x":28,"y":80,"height":0},{"id":"b","name":"Bridge","x":50,"y":80,"height":1},{"id":"c","name":"Orchard","x":72,"y":80,"height":0}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","c",2],["c","t",2]]},
 {"id":"ridge","title":"Beat the bell","brief":"Today your legs are fresh, but the cafe closes early.","start":"s","goal":"t","distanceBudget":4,"climbBudget":4,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"h","name":"Ridge","x":50,"y":18,"height":4},{"id":"t","name":"Cafe","x":88,"y":48,"height":0},{"id":"a","name":"Mill","x":28,"y":80,"height":0},{"id":"b","name":"Bridge","x":50,"y":80,"height":1},{"id":"c","name":"Orchard","x":72,"y":80,"height":0}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","c",2],["c","t",2]]},
 {"id":"two-hills","title":"Two hills count twice","brief":"Dropping into a hollow does not give a climb back.","start":"s","goal":"t","distanceBudget":6,"climbBudget":2,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"p","name":"West hill","x":30,"y":18,"height":2},{"id":"q","name":"Hollow","x":50,"y":18,"height":0},{"id":"r","name":"East hill","x":70,"y":18,"height":2},{"id":"t","name":"Cafe","x":88,"y":48,"height":0},{"id":"a","name":"Towpath","x":32,"y":80,"height":1},{"id":"b","name":"Canal","x":68,"y":80,"height":1}],"edges":[["s","p",1],["p","q",1],["q","r",1],["r","t",1],["s","a",2],["a","b",2],["b","t",2]]},
 {"id":"cafe-upward","title":"Climb to the cafe","brief":"The parcel goes uphill. Take the small rises rather than the roof road.","start":"s","goal":"t","distanceBudget":8,"climbBudget":3,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"h","name":"Roof road","x":50,"y":18,"height":4},{"id":"t","name":"Cafe","x":88,"y":48,"height":3},{"id":"a","name":"Mill","x":28,"y":80,"height":0},{"id":"b","name":"Bridge","x":50,"y":80,"height":1},{"id":"c","name":"Orchard","x":72,"y":80,"height":2}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","c",2],["c","t",2]]},
 {"id": "cafe-homeward", "title": "Bring the empty bag home", "brief": "The same hills face the other way. A short climb buys a long descent.", "start": "t", "goal": "s", "distanceBudget": 4, "climbBudget": 1, "nodes": [{"id": "s", "name": "Depot", "x": 12, "y": 48, "height": 0}, {"id": "h", "name": "Roof road", "x": 50, "y": 18, "height": 4}, {"id": "t", "name": "Cafe", "x": 88, "y": 48, "height": 3}, {"id": "a", "name": "Mill", "x": 28, "y": 80, "height": 0}, {"id": "b", "name": "Bridge", "x": 50, "y": 80, "height": 1}, {"id": "c", "name": "Orchard", "x": 72, "y": 80, "height": 2}], "edges": [["s", "h", 2], ["h", "t", 2], ["s", "a", 2], ["a", "b", 2], ["b", "c", 2], ["c", "t", 2]]},
 {"id": "bakery-gentle", "title": "Two small rises", "brief": "Both little rises count. Together they still cost less climbing than the beacon.", "start": "s", "goal": "t", "distanceBudget": 6, "climbBudget": 2, "nodes": [{"id": "s", "name": "Depot", "x": 12, "y": 48, "height": 0}, {"id": "h", "name": "Beacon", "x": 50, "y": 18, "height": 3}, {"id": "t", "name": "Bakery", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "West rise", "x": 28, "y": 80, "height": 1}, {"id": "b", "name": "Ditch", "x": 50, "y": 80, "height": 0}, {"id": "c", "name": "East rise", "x": 72, "y": 80, "height": 1}], "edges": [["s", "h", 2], ["h", "t", 2], ["s", "a", 1], ["a", "b", 2], ["b", "c", 2], ["c", "t", 1]]},
 {"id":"bakery-express","title":"Before the ovens close","brief":"The bakery needs the parcel now. Spend the climbing allowance on the shorter road.","start":"s","goal":"t","distanceBudget":4,"climbBudget":3,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"h","name":"Beacon","x":50,"y":18,"height":3},{"id":"t","name":"Bakery","x":88,"y":48,"height":0},{"id":"a","name":"West rise","x":28,"y":80,"height":1},{"id":"b","name":"Ditch","x":50,"y":80,"height":0},{"id":"c","name":"East rise","x":72,"y":80,"height":1}],"edges":[["s","h",2],["h","t",2],["s","a",1],["a","b",2],["b","c",2],["c","t",1]]},
 {"id": "station-cut", "title": "Leave the hollow sideways", "brief": "Neither whole road fits. A link from the hollow lets you leave the second hill behind.", "start": "s", "goal": "t", "distanceBudget": 6, "climbBudget": 5, "nodes": [{"id": "s", "name": "Depot", "x": 12, "y": 48, "height": 0}, {"id": "p", "name": "West hill", "x": 30, "y": 18, "height": 4}, {"id": "q", "name": "Hollow", "x": 50, "y": 18, "height": 0}, {"id": "r", "name": "East hill", "x": 70, "y": 18, "height": 4}, {"id": "t", "name": "Station", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "Towpath", "x": 32, "y": 80, "height": 1}, {"id": "b", "name": "Canal", "x": 68, "y": 80, "height": 1}], "edges": [["s", "p", 1], ["p", "q", 1], ["q", "r", 1], ["r", "t", 1], ["s", "a", 3], ["a", "b", 3], ["b", "t", 3], ["q", "b", 1]]},
 {"id": "station-canal", "title": "The long flat allowance", "brief": "With less climbing to spare, the canal is worth its extra distance.", "start": "s", "goal": "t", "distanceBudget": 9, "climbBudget": 1, "nodes": [{"id": "s", "name": "Depot", "x": 12, "y": 48, "height": 0}, {"id": "p", "name": "West hill", "x": 30, "y": 18, "height": 4}, {"id": "q", "name": "Hollow", "x": 50, "y": 18, "height": 0}, {"id": "r", "name": "East hill", "x": 70, "y": 18, "height": 4}, {"id": "t", "name": "Station", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "Towpath", "x": 32, "y": 80, "height": 1}, {"id": "b", "name": "Canal", "x": 68, "y": 80, "height": 1}], "edges": [["s", "p", 1], ["p", "q", 1], ["q", "r", 1], ["r", "t", 1], ["s", "a", 3], ["a", "b", 3], ["b", "t", 3], ["q", "b", 1]]},
 {"id": "quay-outward", "title": "Down to the quay", "brief": "The windmill asks for one last rise. The rest of that short road is downhill.", "start": "s", "goal": "t", "distanceBudget": 4, "climbBudget": 1, "nodes": [{"id": "s", "name": "Post", "x": 12, "y": 48, "height": 4}, {"id": "h", "name": "Windmill", "x": 50, "y": 18, "height": 5}, {"id": "t", "name": "Quay", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "Upper lane", "x": 28, "y": 80, "height": 3}, {"id": "b", "name": "Mid lane", "x": 50, "y": 80, "height": 2}, {"id": "c", "name": "Lower lane", "x": 72, "y": 80, "height": 1}], "edges": [["s", "h", 2], ["h", "t", 2], ["s", "a", 2], ["a", "b", 2], ["b", "c", 2], ["c", "t", 2]]},
 {"id": "quay-homeward", "title": "Four steps back up", "brief": "Bring a reply from the quay. Climbing the lanes fits; climbing the windmill does not.", "start": "t", "goal": "s", "distanceBudget": 8, "climbBudget": 4, "nodes": [{"id": "s", "name": "Post", "x": 12, "y": 48, "height": 4}, {"id": "h", "name": "Windmill", "x": 50, "y": 18, "height": 5}, {"id": "t", "name": "Quay", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "Upper lane", "x": 28, "y": 80, "height": 3}, {"id": "b", "name": "Mid lane", "x": 50, "y": 80, "height": 2}, {"id": "c", "name": "Lower lane", "x": 72, "y": 80, "height": 1}], "edges": [["s", "h", 2], ["h", "t", 2], ["s", "a", 2], ["a", "b", 2], ["b", "c", 2], ["c", "t", 2]]},
 {"id": "library-link", "title": "Leave the deep cut", "brief": "A descent into the cut makes the next rise larger. Turn toward the garden instead.", "start": "s", "goal": "t", "distanceBudget": 6, "climbBudget": 5, "nodes": [{"id": "s", "name": "Post", "x": 12, "y": 48, "height": 3}, {"id": "p", "name": "West rim", "x": 30, "y": 18, "height": 5}, {"id": "q", "name": "Deep cut", "x": 50, "y": 18, "height": 1}, {"id": "r", "name": "East rim", "x": 70, "y": 18, "height": 5}, {"id": "t", "name": "Library", "x": 88, "y": 48, "height": 3}, {"id": "a", "name": "South lane", "x": 32, "y": 80, "height": 4}, {"id": "b", "name": "Garden", "x": 68, "y": 80, "height": 4}], "edges": [["s", "p", 1], ["p", "q", 1], ["q", "r", 1], ["r", "t", 1], ["s", "a", 3], ["a", "b", 3], ["b", "t", 3], ["q", "b", 1]]},
 {"id": "library-rims", "title": "Over both rims", "brief": "A tighter distance allowance makes both rims useful. Count the climb out of the deep cut.", "start": "s", "goal": "t", "distanceBudget": 4, "climbBudget": 6, "nodes": [{"id": "s", "name": "Post", "x": 12, "y": 48, "height": 3}, {"id": "p", "name": "West rim", "x": 30, "y": 18, "height": 5}, {"id": "q", "name": "Deep cut", "x": 50, "y": 18, "height": 1}, {"id": "r", "name": "East rim", "x": 70, "y": 18, "height": 5}, {"id": "t", "name": "Library", "x": 88, "y": 48, "height": 3}, {"id": "a", "name": "South lane", "x": 32, "y": 80, "height": 4}, {"id": "b", "name": "Garden", "x": 68, "y": 80, "height": 4}], "edges": [["s", "p", 1], ["p", "q", 1], ["q", "r", 1], ["r", "t", 1], ["s", "a", 3], ["a", "b", 3], ["b", "t", 3], ["q", "b", 1]]},
 {"id": "school-middle", "title": "Not the shortest road", "brief": "Bell hill is too steep and the field is too long. The north road fits both limits.", "start": "s", "goal": "t", "distanceBudget": 4, "climbBudget": 2, "nodes": [{"id": "s", "name": "Depot", "x": 12, "y": 48, "height": 0}, {"id": "p", "name": "North rise", "x": 30, "y": 18, "height": 2}, {"id": "q", "name": "North lane", "x": 70, "y": 18, "height": 2}, {"id": "t", "name": "School", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "South lane", "x": 30, "y": 80, "height": 0}, {"id": "b", "name": "Field", "x": 70, "y": 80, "height": 0}, {"id": "c", "name": "Bell hill", "x": 50, "y": 48, "height": 5}], "edges": [["s", "p", 2], ["p", "q", 1], ["q", "t", 1], ["s", "a", 1], ["a", "b", 3], ["b", "t", 1], ["s", "c", 1], ["c", "t", 1]]},
 {"id": "school-flat", "title": "No climbing today", "brief": "There is time to go around the field. Keep this parcel on level roads.", "start": "s", "goal": "t", "distanceBudget": 5, "climbBudget": 0, "nodes": [{"id": "s", "name": "Depot", "x": 12, "y": 48, "height": 0}, {"id": "p", "name": "North rise", "x": 30, "y": 18, "height": 2}, {"id": "q", "name": "North lane", "x": 70, "y": 18, "height": 2}, {"id": "t", "name": "School", "x": 88, "y": 48, "height": 0}, {"id": "a", "name": "South lane", "x": 30, "y": 80, "height": 0}, {"id": "b", "name": "Field", "x": 70, "y": 80, "height": 0}, {"id": "c", "name": "Bell hill", "x": 50, "y": 48, "height": 5}], "edges": [["s", "p", 2], ["p", "q", 1], ["q", "t", 1], ["s", "a", 1], ["a", "b", 3], ["b", "t", 1], ["s", "c", 1], ["c", "t", 1]]},
 {"id":"glasshouse-link","title":"A cross-road to the glasshouse","brief":"The roof road is too steep and the cistern road is too long. Leave the west roof sideways.","start":"s","goal":"r","distanceBudget":5,"climbBudget":3,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":3},{"id":"p","name":"West roof","x":30,"y":18,"height":5},{"id":"q","name":"Cut","x":60,"y":18,"height":1},{"id":"r","name":"Glasshouse","x":88,"y":48,"height":4},{"id":"a","name":"Cistern","x":30,"y":80,"height":2},{"id":"b","name":"Terrace","x":65,"y":80,"height":3}],"edges":[["s","p",1],["p","q",1],["q","r",2],["s","a",2],["a","b",2],["b","r",2],["p","b",2]]},
 {"id":"glasshouse-home","title":"Bring the glasshouse reply home","brief":"The west roof rises above the glasshouse. The cistern road needs just one climb at the end.","start":"r","goal":"s","distanceBudget":6,"climbBudget":1,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":3},{"id":"p","name":"West roof","x":30,"y":18,"height":5},{"id":"q","name":"Cut","x":60,"y":18,"height":1},{"id":"r","name":"Glasshouse","x":88,"y":48,"height":4},{"id":"a","name":"Cistern","x":30,"y":80,"height":2},{"id":"b","name":"Terrace","x":65,"y":80,"height":3}],"edges":[["s","p",1],["p","q",1],["q","r",2],["s","a",2],["a","b",2],["b","r",2],["p","b",2]]},
 {"id":"glasshouse-express","title":"Before the glasshouse closes","brief":"Four distance is all you have. Save enough climbing for the rise out of the cut.","start":"s","goal":"r","distanceBudget":4,"climbBudget":5,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":3},{"id":"p","name":"West roof","x":30,"y":18,"height":5},{"id":"q","name":"Cut","x":60,"y":18,"height":1},{"id":"r","name":"Glasshouse","x":88,"y":48,"height":4},{"id":"a","name":"Cistern","x":30,"y":80,"height":2},{"id":"b","name":"Terrace","x":65,"y":80,"height":3}],"edges":[["s","p",1],["p","q",1],["q","r",2],["s","a",2],["a","b",2],["b","r",2],["p","b",2]]},
 {"id":"cafe-circuit-short","title":"Deliver and bring back the reply","brief":"Reach the cafe, then bring its reply to the depot. The roof fits eight distance and five climbing.","start":"s","goal":"s","via":["t"],"distanceBudget":8,"climbBudget":5,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"h","name":"Roof road","x":50,"y":18,"height":4},{"id":"t","name":"Cafe","x":88,"y":48,"height":3},{"id":"a","name":"Mill","x":28,"y":80,"height":0},{"id":"b","name":"Bridge","x":50,"y":80,"height":1},{"id":"c","name":"Orchard","x":72,"y":80,"height":2}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","c",2],["c","t",2]]},
 {"id":"cafe-circuit-gentle","title":"A gentler complete delivery","brief":"Reach the cafe and return without the roof. Both legs share sixteen distance and three climbing.","start":"s","goal":"s","via":["t"],"distanceBudget":16,"climbBudget":3,"nodes":[{"id":"s","name":"Depot","x":12,"y":48,"height":0},{"id":"h","name":"Roof road","x":50,"y":18,"height":4},{"id":"t","name":"Cafe","x":88,"y":48,"height":3},{"id":"a","name":"Mill","x":28,"y":80,"height":0},{"id":"b","name":"Bridge","x":50,"y":80,"height":1},{"id":"c","name":"Orchard","x":72,"y":80,"height":2}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","c",2],["c","t",2]]},
 {"id":"observatory-link","title":"A parcel for the observatory","brief":"The tower rises above the destination. A turn at the orchard saves that extra climb.","start":"s","goal":"t","distanceBudget":5,"climbBudget":4,"nodes":[{"id":"s","name":"Depot","x":12,"y":50,"height":0},{"id":"a","name":"Orchard","x":30,"y":20,"height":2},{"id":"b","name":"Water tower","x":70,"y":20,"height":5},{"id":"t","name":"Observatory","x":88,"y":50,"height":4},{"id":"c","name":"Lime kiln","x":30,"y":80,"height":0},{"id":"d","name":"Quarry","x":70,"y":80,"height":1},{"id":"m","name":"Switchback","x":50,"y":50,"height":3}],"edges":[["s","a",2],["a","b",2],["b","t",2],["s","c",2],["c","d",2],["d","t",2],["a","m",1],["m","d",1],["m","t",2]]},
 {"id":"observatory-home","title":"Down from the observatory","brief":"Bring the empty case to the depot without another rise. The quarry road takes too long.","start":"t","goal":"s","distanceBudget":5,"climbBudget":0,"nodes":[{"id":"s","name":"Depot","x":12,"y":50,"height":0},{"id":"a","name":"Orchard","x":30,"y":20,"height":2},{"id":"b","name":"Water tower","x":70,"y":20,"height":5},{"id":"t","name":"Observatory","x":88,"y":50,"height":4},{"id":"c","name":"Lime kiln","x":30,"y":80,"height":0},{"id":"d","name":"Quarry","x":70,"y":80,"height":1},{"id":"m","name":"Switchback","x":50,"y":50,"height":3}],"edges":[["s","a",2],["a","b",2],["b","t",2],["s","c",2],["c","d",2],["d","t",2],["a","m",1],["m","d",1],["m","t",2]]},
 {"id":"tower-parcel","title":"Stop at the water tower","brief":"This parcel belongs at the tower, not the observatory. Spend five climbing units to reach it.","start":"s","goal":"b","distanceBudget":4,"climbBudget":5,"nodes":[{"id":"s","name":"Depot","x":12,"y":50,"height":0},{"id":"a","name":"Orchard","x":30,"y":20,"height":2},{"id":"b","name":"Water tower","x":70,"y":20,"height":5},{"id":"t","name":"Observatory","x":88,"y":50,"height":4},{"id":"c","name":"Lime kiln","x":30,"y":80,"height":0},{"id":"d","name":"Quarry","x":70,"y":80,"height":1},{"id":"m","name":"Switchback","x":50,"y":50,"height":3}],"edges":[["s","a",2],["a","b",2],["b","t",2],["s","c",2],["c","d",2],["d","t",2],["a","m",1],["m","d",1],["m","t",2]]},
  {
    "id": "market-quick",
    "title": "Before the market bell",
    "brief": "The north roof asks for two climbing. Its short road fits the bell.",
    "start": "s",
    "goal": "t",
    "distanceBudget": 4,
    "climbBudget": 2,
    "nodes": [
      {
        "id": "s",
        "name": "Post",
        "x": 12,
        "y": 48,
        "height": 2
      },
      {
        "id": "p",
        "name": "North roof",
        "x": 30,
        "y": 18,
        "height": 4
      },
      {
        "id": "q",
        "name": "North court",
        "x": 68,
        "y": 18,
        "height": 3
      },
      {
        "id": "t",
        "name": "Market",
        "x": 88,
        "y": 48,
        "height": 1
      },
      {
        "id": "a",
        "name": "South court",
        "x": 30,
        "y": 80,
        "height": 1
      },
      {
        "id": "b",
        "name": "South roof",
        "x": 68,
        "y": 80,
        "height": 2
      }
    ],
    "edges": [
      [
        "s",
        "p",
        1
      ],
      [
        "p",
        "q",
        2
      ],
      [
        "q",
        "t",
        1
      ],
      [
        "s",
        "a",
        2
      ],
      [
        "a",
        "b",
        2
      ],
      [
        "b",
        "t",
        2
      ],
      [
        "q",
        "b",
        1
      ]
    ]
  },
  {
    "id": "market-gentle",
    "title": "A parcel without the roof",
    "brief": "The southern courts take longer, but need only one climbing.",
    "start": "s",
    "goal": "t",
    "distanceBudget": 6,
    "climbBudget": 1,
    "nodes": [
      {
        "id": "s",
        "name": "Post",
        "x": 12,
        "y": 48,
        "height": 2
      },
      {
        "id": "p",
        "name": "North roof",
        "x": 30,
        "y": 18,
        "height": 4
      },
      {
        "id": "q",
        "name": "North court",
        "x": 68,
        "y": 18,
        "height": 3
      },
      {
        "id": "t",
        "name": "Market",
        "x": 88,
        "y": 48,
        "height": 1
      },
      {
        "id": "a",
        "name": "South court",
        "x": 30,
        "y": 80,
        "height": 1
      },
      {
        "id": "b",
        "name": "South roof",
        "x": 68,
        "y": 80,
        "height": 2
      }
    ],
    "edges": [
      [
        "s",
        "p",
        1
      ],
      [
        "p",
        "q",
        2
      ],
      [
        "q",
        "t",
        1
      ],
      [
        "s",
        "a",
        2
      ],
      [
        "a",
        "b",
        2
      ],
      [
        "b",
        "t",
        2
      ],
      [
        "q",
        "b",
        1
      ]
    ]
  },
  {
    "id": "market-reply",
    "title": "A reply from the market",
    "brief": "The north court now needs a rise of two. The southern roofs fit the way home.",
    "start": "t",
    "goal": "s",
    "distanceBudget": 6,
    "climbBudget": 2,
    "nodes": [
      {
        "id": "s",
        "name": "Post",
        "x": 12,
        "y": 48,
        "height": 2
      },
      {
        "id": "p",
        "name": "North roof",
        "x": 30,
        "y": 18,
        "height": 4
      },
      {
        "id": "q",
        "name": "North court",
        "x": 68,
        "y": 18,
        "height": 3
      },
      {
        "id": "t",
        "name": "Market",
        "x": 88,
        "y": 48,
        "height": 1
      },
      {
        "id": "a",
        "name": "South court",
        "x": 30,
        "y": 80,
        "height": 1
      },
      {
        "id": "b",
        "name": "South roof",
        "x": 68,
        "y": 80,
        "height": 2
      }
    ],
    "edges": [
      [
        "s",
        "p",
        1
      ],
      [
        "p",
        "q",
        2
      ],
      [
        "q",
        "t",
        1
      ],
      [
        "s",
        "a",
        2
      ],
      [
        "a",
        "b",
        2
      ],
      [
        "b",
        "t",
        2
      ],
      [
        "q",
        "b",
        1
      ]
    ]
  },
 {"id":"river-bell","title":"Across the high bridge","brief":"The bell is close. Spend two climbing units on the bridge.","start":"s","goal":"t","distanceBudget":4,"climbBudget":2,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":1},{"id":"h","name":"High bridge","x":50,"y":18,"height":3},{"id":"t","name":"Dock","x":88,"y":48,"height":0},{"id":"a","name":"Orchard","x":28,"y":80,"height":0},{"id":"b","name":"Ford","x":50,"y":80,"height":1},{"id":"c","name":"Mill","x":72,"y":80,"height":0}],"edges":[["s","h",2],["h","t",2],["s","a",1],["a","b",2],["b","c",2],["c","t",1]]},
 {"id":"river-home","title":"A reply by the ford","brief":"From the dock, the bridge needs three climbing units. Bring the reply through the low banks.","start":"t","goal":"s","distanceBudget":6,"climbBudget":2,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":1},{"id":"h","name":"High bridge","x":50,"y":18,"height":3},{"id":"t","name":"Dock","x":88,"y":48,"height":0},{"id":"a","name":"Orchard","x":28,"y":80,"height":0},{"id":"b","name":"Ford","x":50,"y":80,"height":1},{"id":"c","name":"Mill","x":72,"y":80,"height":0}],"edges":[["s","h",2],["h","t",2],["s","a",1],["a","b",2],["b","c",2],["c","t",1]]},
 {"id":"river-ford","title":"Deliver to the ford first","brief":"The first parcel belongs at the ford. Reach it before finishing at the dock.","start":"s","goal":"t","via":["b"],"distanceBudget":6,"climbBudget":1,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":1},{"id":"h","name":"High bridge","x":50,"y":18,"height":3},{"id":"t","name":"Dock","x":88,"y":48,"height":0},{"id":"a","name":"Orchard","x":28,"y":80,"height":0},{"id":"b","name":"Ford","x":50,"y":80,"height":1},{"id":"c","name":"Mill","x":72,"y":80,"height":0}],"edges":[["s","h",2],["h","t",2],["s","a",1],["a","b",2],["b","c",2],["c","t",1]]},
 {"id":"reedbank-gentle","title":"Along the reeds","brief":"The low towpath spends more distance to avoid the lock roof.","start":"s","goal":"t","distanceBudget":6,"climbBudget":2,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":0},{"id":"a","name":"Reedbank","x":35,"y":80,"height":0},{"id":"b","name":"Towpath","x":65,"y":80,"height":0},{"id":"t","name":"Mill","x":88,"y":50,"height":2},{"id":"h","name":"Lock roof","x":50,"y":20,"height":3}],"edges":[["s","a",2],["a","b",2],["b","t",2],["s","h",2],["h","t",2],["b","h",1]]},
 {"id":"reedbank-fast","title":"Over the lock roof","brief":"The short road rises above the mill before descending to it.","start":"s","goal":"t","distanceBudget":4,"climbBudget":3,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":0},{"id":"a","name":"Reedbank","x":35,"y":80,"height":0},{"id":"b","name":"Towpath","x":65,"y":80,"height":0},{"id":"t","name":"Mill","x":88,"y":50,"height":2},{"id":"h","name":"Lock roof","x":50,"y":20,"height":3}],"edges":[["s","a",2],["a","b",2],["b","t",2],["s","h",2],["h","t",2],["b","h",1]]},
 {"id":"reedbank-home","title":"Back over the roof","brief":"From the mill, the roof needs only one more climbing.","start":"t","goal":"s","distanceBudget":4,"climbBudget":1,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":0},{"id":"a","name":"Reedbank","x":35,"y":80,"height":0},{"id":"b","name":"Towpath","x":65,"y":80,"height":0},{"id":"t","name":"Mill","x":88,"y":50,"height":2},{"id":"h","name":"Lock roof","x":50,"y":20,"height":3}],"edges":[["s","a",2],["a","b",2],["b","t",2],["s","h",2],["h","t",2],["b","h",1]]},
 {"id":"bells-round","title":"Two bells before choir","brief":"Reach the lower bell, then the upper bell, before the choir.","start":"s","goal":"t","distanceBudget":6,"climbBudget":4,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":1},{"id":"a","name":"Lower bell","x":32,"y":80,"height":2},{"id":"b","name":"Upper bell","x":68,"y":20,"height":4},{"id":"t","name":"Choir","x":88,"y":50,"height":3},{"id":"q","name":"Courtyard","x":45,"y":45,"height":0},{"id":"r","name":"Footpath","x":68,"y":80,"height":1}],"edges":[["s","a",2],["a","r",2],["r","t",2],["s","q",1],["q","b",2],["b","t",1],["a","q",1],["q","r",2],["r","b",1]],"via":["a","b"]},
 {"id":"bells-home","title":"Bring the lower reply home","brief":"From the choir, collect the lower bell reply before returning to the post.","start":"t","goal":"s","distanceBudget":6,"climbBudget":1,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":1},{"id":"a","name":"Lower bell","x":32,"y":80,"height":2},{"id":"b","name":"Upper bell","x":68,"y":20,"height":4},{"id":"t","name":"Choir","x":88,"y":50,"height":3},{"id":"q","name":"Courtyard","x":45,"y":45,"height":0},{"id":"r","name":"Footpath","x":68,"y":80,"height":1}],"edges":[["s","a",2],["a","r",2],["r","t",2],["s","q",1],["q","b",2],["b","t",1],["a","q",1],["q","r",2],["r","b",1]],"via":["a"]},
 {"id":"bells-court","title":"Courtyard before the lower bell","brief":"The courtyard delivery comes first. Then reach the lower bell and finish at the choir.","start":"s","goal":"t","distanceBudget":6,"climbBudget":4,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":1},{"id":"a","name":"Lower bell","x":32,"y":80,"height":2},{"id":"b","name":"Upper bell","x":68,"y":20,"height":4},{"id":"t","name":"Choir","x":88,"y":50,"height":3},{"id":"q","name":"Courtyard","x":45,"y":45,"height":0},{"id":"r","name":"Footpath","x":68,"y":80,"height":1}],"edges":[["s","a",2],["a","r",2],["r","t",2],["s","q",1],["q","b",2],["b","t",1],["a","q",1],["q","r",2],["r","b",1]],"via":["q","a"]},
 {"id":"orchard-express","title":"Crates to the orchard","brief":"Three distance is all you have. The hollow makes the last rise count.","start":"s","goal":"t","distanceBudget":3,"climbBudget":4,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":2},{"id":"a","name":"Ridge","x":35,"y":20,"height":4},{"id":"b","name":"Hollow","x":65,"y":20,"height":1},{"id":"t","name":"Orchard","x":88,"y":50,"height":3},{"id":"c","name":"Canal","x":35,"y":80,"height":2},{"id":"d","name":"Footbridge","x":65,"y":80,"height":3}],"edges":[["s","a",1],["a","b",1],["b","t",1],["s","c",2],["c","d",2],["d","t",2],["b","d",1]]},
 {"id":"orchard-low","title":"The low road to the orchard","brief":"The canal takes longer but asks for only one climbing unit.","start":"s","goal":"t","distanceBudget":6,"climbBudget":1,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":2},{"id":"a","name":"Ridge","x":35,"y":20,"height":4},{"id":"b","name":"Hollow","x":65,"y":20,"height":1},{"id":"t","name":"Orchard","x":88,"y":50,"height":3},{"id":"c","name":"Canal","x":35,"y":80,"height":2},{"id":"d","name":"Footbridge","x":65,"y":80,"height":3}],"edges":[["s","a",1],["a","b",1],["b","t",1],["s","c",2],["c","d",2],["d","t",2],["b","d",1]]},
 {"id":"orchard-home","title":"Empty crates home","brief":"Bring the empty crates home without another rise.","start":"t","goal":"s","distanceBudget":6,"climbBudget":0,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":2},{"id":"a","name":"Ridge","x":35,"y":20,"height":4},{"id":"b","name":"Hollow","x":65,"y":20,"height":1},{"id":"t","name":"Orchard","x":88,"y":50,"height":3},{"id":"c","name":"Canal","x":35,"y":80,"height":2},{"id":"d","name":"Footbridge","x":65,"y":80,"height":3}],"edges":[["s","a",1],["a","b",1],["b","t",1],["s","c",2],["c","d",2],["d","t",2],["b","d",1]]},
 {"id":"orangery-express","title":"An urgent print","brief":"Reach the orangery by the steps. A short trip can spend more climbing.","nodes":[{"id":"p","name":"Print shop","x":12,"y":75,"height":0},{"id":"s","name":"Steps","x":44,"y":22,"height":3},{"id":"g","name":"Garden","x":47,"y":84,"height":1},{"id":"o","name":"Orangery","x":84,"y":53,"height":2}],"edges":[["p","s",1],["s","o",2],["p","g",3],["g","o",2],["s","g",1]],"start":"p","goal":"o","distanceBudget":3,"climbBudget":3},
 {"id":"orangery-garden","title":"A garden print","brief":"Reach the same orangery with only two climbing units. The garden takes more distance.","nodes":[{"id":"p","name":"Print shop","x":12,"y":75,"height":0},{"id":"s","name":"Steps","x":44,"y":22,"height":3},{"id":"g","name":"Garden","x":47,"y":84,"height":1},{"id":"o","name":"Orangery","x":84,"y":53,"height":2}],"edges":[["p","s",1],["s","o",2],["p","g",3],["g","o",2],["s","g",1]],"start":"p","goal":"o","distanceBudget":5,"climbBudget":2},
 {"id":"orangery-reply","title":"The reply comes down","brief":"Return from the orangery to the print shop, delivering at the steps first. Going up to the steps still counts.","nodes":[{"id":"p","name":"Print shop","x":12,"y":75,"height":0},{"id":"s","name":"Steps","x":44,"y":22,"height":3},{"id":"g","name":"Garden","x":47,"y":84,"height":1},{"id":"o","name":"Orangery","x":84,"y":53,"height":2}],"edges":[["p","s",1],["s","o",2],["p","g",3],["g","o",2],["s","g",1]],"start":"o","goal":"p","distanceBudget":3,"climbBudget":1,"via":["s"]},
 {"id":"tide-mill-gentle","title":"The low yard before the mill","brief":"Drop into the yard, then count both rises to the mill. Seven distance and four climbing fit.","start":"s","goal":"t","distanceBudget":7,"climbBudget":4,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":2},{"id":"h","name":"High wheel","x":50,"y":18,"height":7},{"id":"t","name":"Tide mill","x":88,"y":48,"height":5},{"id":"a","name":"Low yard","x":30,"y":80,"height":1},{"id":"b","name":"Sluice walk","x":68,"y":80,"height":3}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","t",3]]},
 {"id":"tide-mill-express","title":"Over the high wheel","brief":"Four distance is all you have. The wheel asks for five climbing before the descent.","start":"s","goal":"t","distanceBudget":4,"climbBudget":5,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":2},{"id":"h","name":"High wheel","x":50,"y":18,"height":7},{"id":"t","name":"Tide mill","x":88,"y":48,"height":5},{"id":"a","name":"Low yard","x":30,"y":80,"height":1},{"id":"b","name":"Sluice walk","x":68,"y":80,"height":3}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","t",3]]},
 {"id":"tide-mill-reply","title":"The mill reply goes down","brief":"From the mill, one rise of two reaches the wheel. Descend to the post without refunding that climb.","start":"t","goal":"s","distanceBudget":4,"climbBudget":2,"nodes":[{"id":"s","name":"Post","x":12,"y":48,"height":2},{"id":"h","name":"High wheel","x":50,"y":18,"height":7},{"id":"t","name":"Tide mill","x":88,"y":48,"height":5},{"id":"a","name":"Low yard","x":30,"y":80,"height":1},{"id":"b","name":"Sluice walk","x":68,"y":80,"height":3}],"edges":[["s","h",2],["h","t",2],["s","a",2],["a","b",2],["b","t",3]]},
 {"id":"signal-link","title":"Turn off the high shelf","brief":"The notch asks for another climb. The link from the shelf reaches the goods yard without it.","start":"s","goal":"t","distanceBudget":4,"climbBudget":3,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":2},{"id":"a","name":"West shelf","x":30,"y":20,"height":4},{"id":"b","name":"Notch","x":60,"y":20,"height":1},{"id":"t","name":"Signal box","x":88,"y":50,"height":3},{"id":"c","name":"Lower lane","x":30,"y":80,"height":2},{"id":"d","name":"Goods yard","x":65,"y":80,"height":2}],"edges":[["s","a",1],["a","b",1],["b","t",1],["s","c",2],["c","d",2],["d","t",2],["a","d",1]]},
 {"id":"signal-express","title":"Through the signal notch","brief":"Three distance is all you have. Count both the shelf and the climb out of the notch.","start":"s","goal":"t","distanceBudget":3,"climbBudget":4,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":2},{"id":"a","name":"West shelf","x":30,"y":20,"height":4},{"id":"b","name":"Notch","x":60,"y":20,"height":1},{"id":"t","name":"Signal box","x":88,"y":50,"height":3},{"id":"c","name":"Lower lane","x":30,"y":80,"height":2},{"id":"d","name":"Goods yard","x":65,"y":80,"height":2}],"edges":[["s","a",1],["a","b",1],["b","t",1],["s","c",2],["c","d",2],["d","t",2],["a","d",1]]},
 {"id":"signal-home","title":"The signal reply comes down","brief":"Bring the reply home without another rise. The goods yard and lower lane stay below the signal box.","start":"t","goal":"s","distanceBudget":6,"climbBudget":0,"nodes":[{"id":"s","name":"Post","x":12,"y":50,"height":2},{"id":"a","name":"West shelf","x":30,"y":20,"height":4},{"id":"b","name":"Notch","x":60,"y":20,"height":1},{"id":"t","name":"Signal box","x":88,"y":50,"height":3},{"id":"c","name":"Lower lane","x":30,"y":80,"height":2},{"id":"d","name":"Goods yard","x":65,"y":80,"height":2}],"edges":[["s","a",1],["a","b",1],["b","t",1],["s","c",2],["c","d",2],["d","t",2],["a","d",1]]},
];
