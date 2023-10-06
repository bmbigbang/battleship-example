import React from "react"
import { Grid } from "@mui/material"

interface Props extends React.PropsWithChildren {}

export const Cols = ({ children }: Props) => {
    return <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(colIndex => (
            <Grid key={`col-${colIndex}`} item xs={1} display="flex" minHeight="100%">
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    {React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
                        return React.cloneElement(child, { colIndex }, child.props.children)
                    })}
                </Grid>
            </Grid>
        ))}
    </>
}