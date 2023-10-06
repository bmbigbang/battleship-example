import {defaultShipData} from "./defaultShipData";
import {useMemo} from "react";

export type ShipTypes = 'carrier' | 'battleship' | 'cruiser' | 'destroyer' | 'submarine';

export type ShipLayout = {
    ship: ShipTypes,
    positions: number[][]
}

export type ShipPositions = {
    shipTypes: Record<ShipTypes, { size: number, count: number }>
    layout: ShipLayout[]
}

export const useShipPositions = (): ShipPositions => {
    const memo: ShipPositions = useMemo(() => {
        const shipPositions = { shipTypes: defaultShipData.shipTypes, layout: [] } as ShipPositions
        for (const [shipName, shipDetails] of Object.entries(defaultShipData.shipTypes)) {
            let count = 0;
            while (count < shipDetails.count) {
                const newOrientation = Math.random() >= 0.5 ? "horizontal" : "vertical"
                const newPositions = [];
                const newStart = [
                    Math.round(Math.random() * 9),
                    Math.round(Math.random() * 9)
                ]
                if (newOrientation === "horizontal") {
                    for (let x = 1; x <= shipDetails.size; x++) {
                        const newPosition = [
                            newStart[0] + x,
                            newStart[1]
                        ];
                        if (!shipPositions.layout.find(({ positions }) =>
                            positions.find(position => position[0] === newPosition[0] && position[1] === newPosition[1])
                        ) && newPosition[0] > 0 && newPosition[0] < 10 && newPosition[1] > 0 && newPosition[1] < 10) {
                            newPositions.push(newPosition)
                        }
                    }
                }
                else {
                    for (let x = 1; x <= shipDetails.size; x++) {
                        const newPosition = [
                            newStart[0],
                            newStart[1] + x
                        ];
                        if (!shipPositions.layout.find(({ positions }) =>
                            positions.find(position => position[0] === newPosition[0] && position[1] === newPosition[1])
                        )  && newPosition[0] > 0 && newPosition[0] < 10 && newPosition[1] > 0 && newPosition[1] < 10) {
                            newPositions.push(newPosition)
                        }
                    }
                }
                if (newPositions.length === shipDetails.size) {
                    count += 1
                    // @ts-ignore
                    shipPositions.layout.push({ ship: shipName, positions: newPositions })
                }
            }

            // const newPositions = defaultShipData.layout.find(s => s.ship === shipName)?.positions;
        }
        return shipPositions
    }, [])

    return memo;
}