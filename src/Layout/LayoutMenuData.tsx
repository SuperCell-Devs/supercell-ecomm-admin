import React from "react";
import {
    Award, LibraryBig, MapIcon, LandPlot, SlidersHorizontal, MapPinIcon, ShoppingBag,
    UserRound, Home,
} from 'lucide-react';


const menuData: any = [
    {
        label: 'Adminstrator',
        isTitle: true,
    },
    {
        id: 'products',
        label: 'Products',
        icon: <ShoppingBag />,
        link: '/',
        parentId: 2
    },
    {
        id: 'home-manager',
        label: 'Home Manager',
        icon: <Home />,
        link: '/home-manager',
        parentId: 2
    },
    {
        id: 'slider-manager',
        label: 'Sliders Manager',
        icon: <SlidersHorizontal />,
        link: '/slider-manager',
        parentId: 2
    },
    {
        id: 'brands',
        label: 'Brands',
        icon: <Award />,
        link: '/brands',
        parentId: 2
    },
    {
        id: 'vendors',
        label: 'Vendors',
        icon: <UserRound />,
        link: '/vendors',
        parentId: 2
    },

    {
        id: 'country',
        label: 'Country',
        icon: <MapIcon />,
        link: '/country',
        parentId: 2
    },
    {
        id: 'districts',
        label: 'Districts',
        icon: <MapPinIcon />,
        link: '/district',
        parentId: 2
    },
    {
        id: 'province',
        label: 'Provinces',
        icon: <LandPlot />,
        link: '/province',
        parentId: 2
    },
    {
        id: 'category',
        label: 'Category',
        icon: <LibraryBig />,
        link: '/category',
        parentId: 2
    },


];

export { menuData };