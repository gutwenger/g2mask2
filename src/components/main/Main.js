import React from 'react';
import { useItems } from '../../context/ItemContext';
import Filter from './filter/Filter';
import MainHero from './MainHero';
import MainMenu from './MainMenu';
import Sort from './sort/Sort';

const Main = () => {

    const { items } = useItems();

    return (
        <div id="main" className="main">
            <MainHero sloganH2="WEAR MASK!" sloganP="PROTECT YOURSELF AND YOUR LOVE ONES" />
            { items && <Filter /> }
            { items && <Sort /> }
            <MainMenu />
        </div>
    )
}

export default Main;