const fuelData = [
    {
        Id: 1,
        Name: "SM1",
        Capacity: 20000,
        FuelVolume: [
            {
                Id: 1,
                FocusDate: "2025-01-01",
                FuelRefuel: 10,
                FuelDrain: 5,
                FuelRemaining: 15
            },
            {
                Id: 2,
                FocusDate: "2025-01-02",
                FuelRefuel: 20,
                FuelDrain: 15,
                FuelRemaining: 25
            },
            {
                Id: 3,
                FocusDate: "2025-01-03",
                FuelRefuel: 30,
                FuelDrain: 10,
                FuelRemaining: 35
            }
        ],
        FuelActivity: [
            {
                Id: 1,
                FocusDate: "2025-01-01",
                ShipLoaded: 10,
                ShipLight: 15,
                ShipEmpty: 5,
                ShipOthers: 7,
                STDLight: 15,
                STDLoaded: 10
            },
            {
                Id: 2,
                FocusDate: "2025-01-02",
                ShipLoaded: 20,
                ShipLight: 25,
                ShipEmpty: 15,
                ShipOthers: 3,
                STDLight: 25,
                STDLoaded: 20
            },
            {
                Id: 3,
                FocusDate: "2025-01-03",
                ShipLoaded: 30,
                ShipLight: 35,
                ShipEmpty: 10,
                ShipOthers: 12,
                STDLight: 35,
                STDLoaded: 30
            }
        ],
        FuelConsumption: [
            {
                Id: 1,
                FocusDate: "2025-01-01",
                ShipLoaded: 10,
                ShipLight: 15,
                ShipEmpty: 5,
                STDLight: 15,
                STDLoaded: 10
            },
            {
                Id: 2,
                FocusDate: "2025-01-02",
                ShipLoaded: 20,
                ShipLight: 25,
                ShipEmpty: 15,
                STDLight: 25,
                STDLoaded: 20
            },
            {
                Id: 3,
                FocusDate: "2025-01-03",
                ShipLoaded: 30,
                ShipLight: 35,
                ShipEmpty: 10,
                STDLight: 35,
                STDLoaded: 30
            }
        ]
    },
    {
        Id: 2,
        Name: "SM2",
        Capacity: 20000,
        FuelVolume: [
            {
                Id: 1,
                FocusDate: "2025-02-01",
                FuelRefuel: 15,
                FuelDrain: 5,
                FuelRemaining: 10
            },
            {
                Id: 2,
                FocusDate: "2025-02-02",
                FuelRefuel: 25,
                FuelDrain: 15,
                FuelRemaining: 20
            },
            {
                Id: 3,
                FocusDate: "2025-02-03",
                FuelRefuel: 35,
                FuelDrain: 10,
                FuelRemaining: 30
            }
        ],
        FuelActivity: [
            {
                Id: 1,
                FocusDate: "2025-02-01",
                ShipLoaded: 15,
                ShipLight: 10,
                ShipEmpty: 5,
                ShipOthers: 7,
                STDLight: 10,
                STDLoaded: 15
            },
            {
                Id: 2,
                FocusDate: "2025-02-02",
                ShipLoaded: 25,
                ShipLight: 20,
                ShipEmpty: 15,
                ShipOthers: 5,
                STDLight: 20,
                STDLoaded: 25
            },
            {
                Id: 3,
                FocusDate: "2025-02-03",
                ShipLoaded: 35,
                ShipLight: 30,
                ShipEmpty: 10,
                ShipOthers: 3,
                STDLight: 30,
                STDLoaded: 35
            }
        ],
        FuelConsumption: [
            {
                Id: 1,
                FocusDate: "2025-02-01",
                ShipLoaded: 15,
                ShipLight: 10,
                ShipEmpty: 5,
                STDLight: 10,
                STDLoaded: 15
            },
            {
                Id: 2,
                FocusDate: "2025-02-02",
                ShipLoaded: 25,
                ShipLight: 20,
                ShipEmpty: 15,
                STDLight: 20,
                STDLoaded: 25
            },
            {
                Id: 3,
                FocusDate: "2025-02-03",
                ShipLoaded: 35,
                ShipLight: 30,
                ShipEmpty: 10,
                STDLight: 30,
                STDLoaded: 35
            }
        ]
    },
    {
        Id: 3,
        Name: "SM3",
        Capacity: 20000,
        FuelVolume: [
            {
                Id: 1,
                FocusDate: "2025-01-01",
                FuelRefuel: 5,
                FuelDrain: 10,
                FuelRemaining: 15
            },
            {
                Id: 2,
                FocusDate: "2025-01-02",
                FuelRefuel: 15,
                FuelDrain: 20,
                FuelRemaining: 25
            },
            {
                Id: 3,
                FocusDate: "2025-01-03",
                FuelRefuel: 10,
                FuelDrain: 30,
                FuelRemaining: 35
            }
        ],
        FuelActivity: [
            {
                Id: 1,
                FocusDate: "2025-01-01",
                ShipLoaded: 5,
                ShipLight: 15,
                ShipEmpty: 10,
                ShipOthers: 3,
                STDLight: 15,
                STDLoaded: 5
            },
            {
                Id: 2,
                FocusDate: "2025-01-02",
                ShipLoaded: 15,
                ShipLight: 25,
                ShipEmpty: 20,
                ShipOthers: 9,
                STDLight: 25,
                STDLoaded: 15
            },
            {
                Id: 3,
                FocusDate: "2025-01-03",
                ShipLoaded: 10,
                ShipLight: 35,
                ShipEmpty: 30,
                ShipOthers: 5,
                STDLight: 35,
                STDLoaded: 10
            }
        ],
        FuelConsumption: [
            {
                Id: 1,
                FocusDate: "2025-01-01",
                ShipLoaded: 5,
                ShipLight: 15,
                ShipEmpty: 10,
                STDLight: 15,
                STDLoaded: 5
            },
            {
                Id: 2,
                FocusDate: "2025-01-02",
                ShipLoaded: 15,
                ShipLight: 25,
                ShipEmpty: 20,
                STDLight: 25,
                STDLoaded: 15
            },
            {
                Id: 3,
                FocusDate: "2025-01-03",
                ShipLoaded: 10,
                ShipLight: 35,
                ShipEmpty: 30,
                STDLight: 35,
                STDLoaded: 10
            }
        ]
    }
];

export default fuelData;
