import React from "react"
import { Grid } from "@mui/material"

interface Props extends React.PropsWithChildren {
    colIndex?: number
}

export const Rows = ({ children, colIndex }: Props) => {
    return <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(rowIndex => (
            <Grid key={`row-${rowIndex}`} item xs={1} display="flex" width="100%">
                {React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
                    return React.cloneElement(child, { colIndex, rowIndex }, child.props.children)
                })}
            </Grid>
        ))}
    </>
}