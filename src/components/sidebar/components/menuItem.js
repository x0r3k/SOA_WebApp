import React, { useState } from "react";
import SingleLevel from './singleLevel';
import MultiLevel from './multiLevel';

export default function MenuItem ({ item })  {
    const Component = item.items.length ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};