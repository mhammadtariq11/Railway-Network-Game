const state = {
    playerName: '',
    difficulty: 'easy',
    gameStarted: false,
    timer: 0,
    timerInterval: null,
    currentMap: null,
    pieces: new Map(),
    savedGames: new Map(),
    get saveKey() {
        return `gameState-${this.playerName}-${this.difficulty}`;
    }
};

const mapConfigs = {
    easy: {
        size: 5,
        maps: [
            [
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }, { type: 'oasis', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ]


        ]
    },
    hard: {

        size: 7,
        maps: [
            [
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'oasis', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }],
                [{ type: 'mountain', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }],
                [{ type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 270 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 2700 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 90 }, { type: 'bridge', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'mountain', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'bridge', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }],
                [{ type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ] 
        ]
    }
};
const correctMapConfigs = {
    easy: {
        size: 5,
        maps: [
            [
                [{type: "turn", rotation: 0},        {type: "mountain_rail", rotation: 0}, {type: "turn", rotation: 0},        {type: "turn", rotation: 90},       {type: "turn", rotation: 90}],
                [{type: "straight", rotation: 0},    {type: "straight", rotation: 0},       {type: "straight", rotation: 0},    {type: "bridge_rail", rotation: 0}, {type: "straight", rotation: 0}],
                [{type: "bridge_rail", rotation: 0}, {type: "turn", rotation: 270},         {type: "mountain_rail", rotation: 0}, {type: "turn", rotation: 270},   {type: "turn", rotation: 90}],
                [{type: "straight", rotation: 0},    {type: "turn", rotation: 0},           {type: "turn", rotation: 90},       {type: "straight", rotation: 90},   {type: "straight", rotation: 0}],
                [{type: "turn", rotation: 270},      {type: "turn", rotation: 180},         {type: "mountain_rail", rotation: 0}, {type: "straight", rotation: 90}, {type: "turn", rotation: 180}]
            ],
            [
                [{ type: 'oasis', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'bridge_rail', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }],
                [{ type: 'turn', rotation: 270 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'mountain_rail', rotation: 0 }],
                [{ type: 'bridge_rail', rotation: 0 }, { type: 'oasis', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'straight', rotation: 270 }, { type: 'turn', rotation: 90 }],
                [{ type: 'straight', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'oasis', rotation: 0 }, { type: 'straight', rotation: 0 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }]
            ],
            [
                [{ type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 90 }],
                [{ type: 'straight', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }],
                [{ type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'mountain_rail', rotation: 0 }],
                [{ type: 'straight', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'straight', rotation: 180 }, { type: 'turn', rotation: 180 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 90 }],
                [{ type: 'straight', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }],
                [{ type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'mountain_rail', rotation: 0 }],
                [{ type: 'straight', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'straight', rotation: 180 }, { type: 'turn', rotation: 180 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'empty', rotation: 0 }]
            ],
            [
                [{ type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'bridge_rail', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }],
                [{ type: 'straight', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }],
                [{ type: 'bridge_rail', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 90 }],
                [{ type: 'straight', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'bridge_rail', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'straight', rotation: 0 }],
                [{ type: 'turn', rotation: 270 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }]
            ]            
                        
  
        ]
    },
    hard: {
        size: 7,
        maps: [
            [
                [{ type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 90 }, { type: 'bridge_rail', rotation: 0 }],
                [{ type: 'mountain_rail', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }, { type: 'straight', rotation: 0 }],
                [{ type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }],
                [{ type: 'straight', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }, { type: 'bridge_rail', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }],
                [{ type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }, { type: 'straight', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'straight', rotation: 0 }]
            ],
            [
                [{ type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'empty', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }],
                [{ type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'mountain_rail', rotation: 0 }, { type: 'straight', rotation: 0 }],
                [{ type: 'turn', rotation: 270 }, { type: 'straight', rotation: 90 }, { type: 'bridge_rail', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }, { type: 'bridge_rail', rotation: 0 }],
                [{ type: 'mountain_rail', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }, { type: 'straight', rotation: 180 }],
                [{ type: 'straight', rotation: 0 }, { type: 'empty', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }],
                [{ type: 'straight', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 180 }, { type: 'straight', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'empty', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }]
            ]
            [
                [{ type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 90 }],
                [{ type: 'straight', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 180 }],
                [{ type: 'turn', rotation: 270 }, { type: 'bridge_rail', rotation: 0 }, { type: 'bridge_rail', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 90 }],
                [{ type: 'turn', rotation: 0 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 180 }],
                [{ type: 'turn', rotation: 270 }, { type: 'turn', rotation: 90 }, { type: 'mountain_rail', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 90 }],
                [{ type: 'turn', rotation: 0 }, { type: 'mountain_rail', rotation: 0 }, { type: 'straight', rotation: 0 }, { type: 'bridge_rail', rotation: 0 }, { type: 'turn', rotation: 0 }, { type: 'turn', rotation: 90 }, { type: 'straight', rotation: 180 }],
                [{ type: 'turn', rotation: 270 }, { type: 'straight', rotation: 90 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }, { type: 'turn', rotation: 270 }, { type: 'turn', rotation: 180 }]
            ]
             
        ]
    }
};

loadSavedGames();
setupEventListeners();

function setupEventListeners() {
    document.querySelector('#start-game').addEventListener('click', startGame);
    document.querySelector('#show-rules').addEventListener('click', showRules);
    
    document.querySelector('#save-game').addEventListener('click', saveGame);
    document.querySelector('#validate-solution').addEventListener('click', validateSolution);
    document.querySelector('#reset-game').addEventListener('click', resetGame); 
    document.querySelector('.close-modal').addEventListener('click', hideRules);

    setupDifficultyToggle();
}
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function startGame() {
    const nameInput = document.querySelector('#player-name');
    const activeToggle = document.querySelector('.difficulty-toggle.active');

    if (!nameInput.value) {
        showMessage('Please enter your name');
        return;
    }

    state.playerName = nameInput.value;
    state.difficulty = activeToggle.dataset.difficulty;
    state.gameStarted = true;
    localStorage.setItem('lastPlayerName', state.playerName);
    localStorage.setItem('lastDifficulty', state.difficulty);

    const uniqueKey = `${state.playerName}-${state.difficulty}`;
    if (state.savedGames.has(uniqueKey)) {
        const savedData = state.savedGames.get(uniqueKey);
        state.timer = savedData.timer;
        state.currentMap = savedData.currentMap;
        state.pieces = new Map(savedData.pieces);
        state.gameStarted = true;

        document.querySelector('.menu-screen').style.display = 'none';
        document.querySelector('.game-screen').style.display = 'block';
        document.querySelector('#player-display').textContent = state.playerName;

        initializeMap(true); 
        startTimer();
    } else {
        document.querySelector('.menu-screen').style.display = 'none';
        document.querySelector('.game-screen').style.display = 'block';
        document.querySelector('#player-display').textContent = state.playerName;

        initializeMap(false);
        startTimer();
    }
}
function initializeMap(isLoadingSavedGame) {
    const config = mapConfigs[state.difficulty];
    if (!isLoadingSavedGame) {
        const mapIndex = Math.floor(Math.random() * config.maps.length);
        state.currentMap = config.maps[mapIndex];
        state.mapIndex = mapIndex; 
    } else {
        const mapIndex = config.maps.findIndex(map => JSON.stringify(map) === JSON.stringify(state.currentMap));
        state.mapIndex = mapIndex !== -1 ? mapIndex : 0;
    }

    const grid = document.querySelector('#game-grid');
    grid.style.gridTemplateColumns = `repeat(${config.size}, var(--cell-size))`;
    grid.innerHTML = '';

    state.currentMap.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = createCell(cell, i, j);
            grid.appendChild(cellElement);
        });
    });
    if (isLoadingSavedGame) {
        for (const [key, piece] of state.pieces) {
            const [row, col] = key.split('-').map(Number);
            updateCellVisual(row, col, piece.type, piece.rotation);
        }
    }
}

function createCell(cellData, row, col) {
    const cell = document.createElement('div');
    cell.className = `cell ${cellData.type}`;
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.dataset.type = cellData.type;
    if (cellData.rotation) {
        cell.style.transform = `rotate(${cellData.rotation}deg)`;
        cell.dataset.initialRotation = cellData.rotation;
    }

    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        rotatePiece(row, col);
    });

    return cell;
}
function handleCellClick(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const type = cell.dataset.type;

    if (type === 'oasis') return;

    placePiece(row, col, type, e.shiftKey);
}
function placePiece(row, col, cellType, isShiftPressed) {
    const key = `${row}-${col}`;
    const currentPiece = state.pieces.get(key);

    if (currentPiece) {
        state.pieces.delete(key);
        updateCellVisual(row, col, null);
    } else {
        let pieceType = '';
        if (cellType === 'mountain') {
            pieceType = 'mountain_rail';
        } else if (cellType === 'bridge') {
            pieceType = 'bridge_rail';
        } else {
            if (isShiftPressed) {
                pieceType = 'turn';
            } else {
                pieceType = 'straight';
            }
        }

        state.pieces.set(key, {
            type: pieceType,
            rotation: 0
        });
        updateCellVisual(row, col, pieceType);
    }
}

function rotatePiece(row, col) {
    const key = `${row}-${col}`;
    const piece = state.pieces.get(key);

    if (piece) {
        piece.rotation = (piece.rotation + 90) % 360;
        updateCellVisual(row, col, piece.type, piece.rotation);
    }
}

function updateCellVisual(row, col, pieceType, rotation = 0) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    const existing = cell.querySelector('.railway');
    if (existing) {
        existing.remove();
    }

    if (pieceType) {
        const railway = document.createElement('div');
        railway.className = 'railway';
        railway.style.transform = `rotate(${rotation}deg)`;
        let imageName = '';
        if (pieceType === 'straight') {
            imageName = 'straight_rail.png';
        } else if (pieceType === 'turn') {
            imageName = 'curve_rail.png';
        } else if (pieceType === 'mountain_rail') {
            imageName = 'mountain_rail.png';
        } else if (pieceType === 'bridge_rail') {
            imageName = 'bridge_rail.png';
        }

        railway.style.backgroundImage = `url('./pics/${imageName}')`;
        cell.appendChild(railway);
    }
}

function startTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
    }

    const timerDisplay = document.querySelector('#timer');
    timerDisplay.textContent = formatTime(state.timer);

    state.timerInterval = setInterval(() => {
        state.timer++;
        timerDisplay.textContent = formatTime(state.timer);
    }, 1000);
}
function validateSolution() {
    saveGame();
    if (!checkSolutionValidity()) {
        showMessage('The solution is not correct. Please try again.');
        return;
    }
    if (checkAgainstCorrectConfiguration()) {
        clearInterval(state.timerInterval);
        updateLeaderboard();
        showLeaderboard();
        showMessage('Game Completed! Your time has been added to the leaderboard.');
    } else {
        showMessage('The solution is not correct. Please try again.2');
    }
}

function checkAgainstCorrectConfiguration() {
    const correctDataJSON = localStorage.getItem("Saved-gameState");
    if (!correctDataJSON) {
        showMessage('Correct solution not available for comparison.');
        return false;
    }
    const correctData = JSON.parse(correctDataJSON);
    const currentPiecesObj = {};
    for (const [key, piece] of state.pieces.entries()) {
        currentPiecesObj[key] = piece;
    }
    const correctPiecesObj = {};
    for (const [key, piece] of correctData.pieces) {
        correctPiecesObj[key] = piece;
    }

    if (Object.keys(currentPiecesObj).length !== Object.keys(correctPiecesObj).length) {
        return false;
    }
    for (const key in correctPiecesObj) {
        const currentPiece = currentPiecesObj[key];
        const correctPiece = correctPiecesObj[key];

        if (!currentPiece) {
            return false;
        }
        if (currentPiece.type !== correctPiece.type || currentPiece.rotation !== correctPiece.rotation) {
            return false;
        }
    }

    return true;
}

function checkAgainstCorrectConfigurations() {
    const difficulty = state.difficulty;
    const mapIndex = state.mapIndex;

    const correctMap = correctMapConfigs[difficulty].maps[mapIndex];
    if (!correctMap) return false;
    for (let row = 0; row < correctMap.length; row++) {
        for (let col = 0; col < correctMap[row].length; col++) {
            const correctCell = correctMap[row][col];
            const key = `${row}-${col}`;
            const userPiece = state.pieces.get(key);
            if (correctCell.type !== 'empty' && correctCell.type !== 'oasis') {
                if (!userPiece) return false;
                if (userPiece.type !== correctCell.type || userPiece.rotation !== correctCell.rotation) return false;
            } else {
                if (userPiece) return false;
            }
        }
    }

    return true;
}

function checkSolutionValidity() {
    for (let row = 0; row < state.currentMap.length; row++) {
        for (let col = 0; col < state.currentMap[0].length; col++) {
            const cellType = state.currentMap[row][col].type;
            if (cellType !== 'oasis') {
                const key = `${row}-${col}`;
                if (!state.pieces.has(key)) {
                    return false;
                }
            }
        }
    }
    return true;
}
function saveGame() {
    const uniqueKey = `${state.playerName}-${state.difficulty}`;
    const gameData = {
        timer: state.timer,
        currentMap: state.currentMap,
        pieces: Array.from(state.pieces.entries())
    };
    localStorage.setItem(`Saved-gameState`, JSON.stringify(gameData));
    localStorage.setItem(`gameState-${uniqueKey}`, JSON.stringify(gameData));
    showMessage('Game saved successfully');
}

/*function saveGame() {
    const gameData = {
        timer: state.timer,
        currentMap: state.currentMap,
        pieces: Array.from(state.pieces.entries())
    };
    localStorage.setItem(`Saved-gameState`, JSON.stringify(gameData));

}*/
/*function saveGame() {
    const uniqueKey = `${state.playerName}-${state.difficulty}`;
    const gameData = {
        timer: state.timer,
        currentMap: state.currentMap,
        pieces: Array.from(state.pieces.entries())
    };
    localStorage.setItem(`gameState-${uniqueKey}`, JSON.stringify(gameData));
    showMessage('Game saved successfully');
}*/
function loadSavedGames() {
    state.savedGames = new Map();
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('gameState-')) {
            const gameData = JSON.parse(localStorage.getItem(key));
            const uniqueKey = key.replace('gameState-', '');
            state.savedGames.set(uniqueKey, gameData);
        }
    }
    const lastPlayerName = localStorage.getItem('lastPlayerName');
    const lastDifficulty = localStorage.getItem('lastDifficulty');

    if (lastPlayerName && lastDifficulty) {
        const uniqueKey = `${lastPlayerName}-${lastDifficulty}`;
        if (state.savedGames.has(uniqueKey)) {
            const savedData = state.savedGames.get(uniqueKey);
            state.playerName = lastPlayerName;
            state.difficulty = lastDifficulty;
            state.timer = savedData.timer;
            state.currentMap = savedData.currentMap;
            state.pieces = new Map(savedData.pieces);
            state.gameStarted = true;
            document.querySelector('.menu-screen').style.display = 'none';
            document.querySelector('.game-screen').style.display = 'block';
            document.querySelector('#player-display').textContent = state.playerName;

            initializeMap(true); 
            startTimer();
        }
    }
}

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({
        name: state.playerName,
        time: state.timer,
        difficulty: state.difficulty,
        date: new Date().toISOString()
    });
    leaderboard.sort((a, b) => {
        if (a.difficulty === b.difficulty) {
            return a.time - b.time;
        }
        return a.difficulty === 'hard' ? 1 : -1;
    });
    const filteredLeaderboard = [];
    const easyScores = leaderboard.filter(score => score.difficulty === 'easy').slice(0, 10);
    const hardScores = leaderboard.filter(score => score.difficulty === 'hard').slice(0, 10);
    filteredLeaderboard.push(...easyScores, ...hardScores);

    localStorage.setItem('leaderboard', JSON.stringify(filteredLeaderboard));
    showLeaderboard();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function showLeaderboard() {
    const leaderboardDiv = document.querySelector('.leaderboard');
    const leaderboardBody = document.querySelector('#leaderboard-body');
    leaderboardDiv.style.display = 'block';

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboardBody.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${formatTime(entry.time)}</td>
            <td>${entry.difficulty}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function showRules() {
    const modal = document.querySelector('#rules-modal');
    const rulesContent = document.querySelector('#rules-content');

    rulesContent.innerHTML = `
        <h3>Game Objective</h3>
        <p>Create a continuous circular railway line that reaches every place where the train can travel.</p>
        
        <h3>Terrain Types</h3>
        <ul>
            <li><strong>Empty Cells:</strong> Railway can continue in any direction except the entry point</li>
            <li><strong>Bridge:</strong> Railway must continue straight in the direction defined by the bridge</li>
            <li><strong>Mountain:</strong> Railway must turn 90° due to rocks blocking two adjacent exits</li>
            <li><strong>Oasis:</strong> No railway can be built on this tile</li>
        </ul>
        
        <h3>Rules</h3>
        <ul>
            <li>The railway line cannot cross itself</li>
            <li>The line cannot branch off</li>
            <li>Each cell can only be used once</li>
            <li>The line must form a complete loop</li>
        </ul>
        
        <h3>Controls</h3>
        <ul>
            <li>Left Click: Place/Remove railway piece</li>
            <li>Shift+Right Click: Place Rounded Railway piece</li>
            <li>Right Click: Rotate railway piece</li>
         
        </ul>
    `;

    modal.style.display = 'block';
}

function hideRules() {
    document.querySelector('#rules-modal').style.display = 'none';
}



function setupDifficultyToggle() {
    const toggleButtons = document.querySelectorAll('.difficulty-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            toggleButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            button.classList.remove('inactive');
            button.classList.add('active');
            state.difficulty = button.dataset.difficulty;
        });
    });
}

function resetGame() {
    localStorage.removeItem(`gameState-${state.playerName}-${state.difficulty}`);
    location.reload();
}