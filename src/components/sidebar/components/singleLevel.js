import React, { useState } from "react";
// import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function SingleLevel({ item }) {
    return (
      <ListItem button key={item.id}>
        <ListItemText primary={item.name} />
      </ListItem>
    );
};