interface Trip {
    start: string;
    end: string;
}

interface Shipment {
    pickups: string[];
    dropoffs: string[];
}

function validateTrips(trips: Trip[], shipment: Shipment): boolean {
    const points: Set<string> = new Set([...shipment.pickups, ...shipment.dropoffs]);
    const reachablePoints: { [point: string]: boolean } = {};
    points.forEach(point => reachablePoints[point] = false);

    shipment.pickups.forEach(pickup => reachablePoints[pickup] = true);
    let changed = true;

    while (changed) {
        changed = false;
        for (const trip of trips) {
            if (!reachablePoints[trip.end] && reachablePoints[trip.start]) {
                reachablePoints[trip.end] = true;
                changed = true;
            }
        }
    }

    for (const dropoff of shipment.dropoffs) {
        if (!reachablePoints[dropoff]) {
            return false;
        }
    }

    return true;
}

const shipment: Shipment = {
    pickups: ["A", "B"],
    dropoffs: ["C", "D"]
};

const trips: Trip[] = [
    { start: "A", end: "W1" },
    { start: "B", end: "W" },
    { start: "W", end: "C" },
    { start: "W", end: "D" }
];

console.log(validateTrips(trips, shipment));
