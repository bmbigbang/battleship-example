import { Card } from "@mui/material"
import { green, red } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {useCallback, useState} from "react";
import {ShipPositions} from "./useShipPositions";


export type CellState = 'miss' | 'hit' | 'unknown'

const cellBackgroundMap = {
    hit: green[200],
    miss: red[200],
    unknown: "white"
}

const cellIconMap = {
    hit: <DoneIcon/>,
    miss: <CloseIcon /> ,
    unknown: <div />
}

type Props = {
    shipPositions: ShipPositions
    rowIndex?: number
    colIndex?: number
}

export const Cell = ({ rowIndex, colIndex, shipPositions }: Props) => {
    const [cellState, setCellState] = useState<CellState>('unknown');

    const onClick = useCallback(() => {
        if (rowIndex === undefined || colIndex === undefined) return;
        if (cellState === 'unknown') {
            let newState = 'miss'
            if (shipPositions.layout.find(({ positions }) => positions.find(position => position[0] === colIndex && position[1] === rowIndex))) {
                newState = 'hit'
            }

            setCellState(newState as CellState)
        }
    }, [cellState, colIndex, rowIndex, shipPositions.layout])

    if (rowIndex === undefined || colIndex === undefined) return (
        <Card sx={{
            backgroundColor: "white",
            display: "flex", minHeight: "100%", minWidth: "100%"
        }}/>
    );

    return (
        <Card sx={{
            backgroundColor: cellBackgroundMap[cellState],
            display: "flex", minHeight: "100%", minWidth: "100%",
            justifyContent: "center",
            alignItems: "center"
        }} onClick={onClick}>
            {cellIconMap[cellState]}
        </Card>
    )
}