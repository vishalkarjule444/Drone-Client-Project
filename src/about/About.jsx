import React from "react";
import Slider from "./Slider";
import Vision from "./Vision";
import Corevalues from "./Corevalues";
import Profile from "./Profile";
import Team from "./Team";
import Counter from "./Counter";
export default function About(){
    return(
        <>
        <Slider/>
        <Profile/>
        <Vision/>
        <Corevalues/>
        <Counter/>
        <Team/>
        </>
    )
}