import { createSelector } from '@reduxjs/toolkit';
import Modal from 'Common/Components/Modal';
import { getImagePath } from 'Common/platform/helpers/getImagePath';
import { GetHomeManager, HomeItem, Paginated } from 'helpers/interface/api';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult, Draggable } from "react-beautiful-dnd";
import {
    updateHomeManager as onUpdateHomeManager,
} from "slices/thunk";

import {
    getHomeManager as onGetHomeManager
} from 'slices/thunk';


interface IItemsList  {
    data: HomeItem[];
 };
const ItemsList = (props: IItemsList) => {
    // topModal
    const [topModal, setTopModal] = useState<boolean>(false);
    const topToggle = () => setTopModal(!topModal);

    const hasList = props.data.length > 0;
    
    return (
        <>
            <button data-modal-target="topModal" type="button"
            className="text-white btn mt-4 bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            onClick={topToggle}>See List
            </button>
            <Modal
                show={topModal}
                onHide={topToggle}
                id="topModal"
                modal-top="true"
                className="fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4"
                dialogClassName="w-screen md:w-[30rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col">
                <Modal.Header
                    className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
                    closeButtonClass="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500">
                        <Modal.Title className="text-16">Item List</Modal.Title>
                </Modal.Header>
                <Modal.Body className="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto ">
                    {
                        hasList ?
                            <div>
                                {props.data?.map((e, index) => {
                                    return <div key={index} className='flex justify-start gap-x-6 flex-wrap gap-y-2 w-full'>
                                         <div className="card w-full">
                                            <div className="card-body">
                                                <ul className="space-y-5 list-disc list-inside rounded-md marker:text-red-500">
                                                    <li>
                                                        <p className="inline-flex text-slate-800 dark:text-zink-600 justify-center items-center gap-x-2">
                                                            Title: <span className='text-slate-500 dark:text-zink-200'>{e.title}</span>
                                                        </p>
                                                        </li>
                                                        
                                                       <li>
                                                        <p className="inline-flex text-slate-800 dark:text-zink-600 justify-center items-center gap-x-2">
                                                            Description: <span className='text-slate-500 dark:text-zink-200'>{e.description}</span>
                                                        </p>
                                                        </li>
                                                        
                                                           <li>
                                                        <p className="inline-flex text-slate-800 dark:text-zink-600 justify-center items-center gap-x-2">
                                                            Redirect: <span className='text-slate-500 dark:text-zink-200'>{e.redirect}</span>
                                                        </p>
                                                        </li>
                                                        
                                                           <li>
                                                        <p className="inline-flex text-slate-800 dark:text-zink-600 justify-center items-center gap-x-2">
                                                            Background: <span className='text-slate-500 dark:text-zink-200'>{e.backGround}</span>
                                                        </p>
                                                        
                                                        </li>
                                                        
                                                        {
                                                            e.image &&
                                                            <li>
                                                        <p className="inline-flex text-slate-800 dark:text-zink-600 justify-center items-center gap-x-2">
                                                            Image: <span className='text-slate-500 dark:text-zink-200'>{getImagePath(e.image)}</span>
                                                        </p>
                                                        
                                                    </li>
                                                      }
                                                </ul>
                                            </div>
                                        </div>
                                        </div>
                                })}
                            </div> :
                            <div>
                                No more available data!!
                            </div>
                    }  
                </Modal.Body>
            </Modal>
        </>
    );


};

/**
 * DND component
 */


interface IDnd {
    setNewOrderedList: React.Dispatch<React.SetStateAction<CardsState>>
    leftState: CardsState
    setLeftState: React.Dispatch<React.SetStateAction<CardsState>>
    rightState: CardsState
    setRightState: React.Dispatch<React.SetStateAction<CardsState>>
};
interface CardsState {
    cards: GetHomeManager[]
}

function getStyle(backGround: string) { 
    const noBg = backGround === null;
    const bg = !noBg && backGround;
    let cardBgStyle = "card-body rounded-t-md";
    if (bg)  {
        cardBgStyle = cardBgStyle + " bg-[" + bg +"]";
      };
    if (noBg) {
        cardBgStyle = cardBgStyle + " border";
      };
    return cardBgStyle;
};
const DND = (props: IDnd) => {
    const { leftState, setLeftState, rightState, setRightState } = props;
    const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (
            result.destination.droppableId === "right" &&
            result.source.droppableId === "left"
        ) {
            // Move from left to right
            const movedQuote = leftState?.cards[sourceIndex];
            setRightState((prevState: any) => ({
                cards: [
                    ...prevState.cards.slice(0, destinationIndex),
                    movedQuote,
                    ...prevState.cards.slice(destinationIndex),
                ],
            }));
            setLeftState((prevState: any) => ({
                cards: prevState.cards.filter((_: any, index: number) => index !== sourceIndex),
            }));
        } else if (
            result.destination.droppableId === "left" &&
            result.source.droppableId === "right"
        ) {
            // Move from right to left
            const movedQuote = rightState.cards[sourceIndex];
            setLeftState((prevState: any) => ({
                cards: [
                    ...prevState.cards.slice(0, destinationIndex),
                    movedQuote,
                    ...prevState.cards.slice(destinationIndex),
                ],
            }));
            setRightState((prevState: any) => ({
                cards: prevState.cards.filter((_: any, index: number) => index !== sourceIndex),
            }));
        } else if (
            result.destination.droppableId === "right" &&
            result.source.droppableId === "right"
        ) {
            // Reorder within right side
            const reorderedQuotes: any = reorder(
                rightState.cards,
                sourceIndex,
                destinationIndex
            );
            setRightState({ cards: reorderedQuotes });
        }
    };
    
    useEffect(() => {
        if (leftState?.cards && rightState?.cards) {
            
            props.setNewOrderedList({
                cards: [
                    ...rightState.cards,
                    ...leftState.cards
                ]
            });
        }
    }, [leftState, rightState]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-2 gap-x-6 h-full">
               <div className='h-3/4 overflow-y-scroll p-4 custom-scrollbar'>
                <Droppable droppableId='left'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h6 className='mb-6'>Available System Items</h6>
                                {
                                    leftState && leftState?.cards?.map((e, index) => {
                                        const cardBgStyle = getStyle(e.backGround);
                                   
                                          return <Draggable
                                                    draggableId={String(e.id)}
                                                    index={index}
                                                    key={e.id}
                                                    >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                            >
                                                                <div className="card">
                                                                        <div className={cardBgStyle}>
                                                                            <h6 className="text-15">
                                                                                {e.backGround ? e.backGround : "No background"}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <h6 className="mb-4 text-15">
                                                                                {e.title ? e.title : "No title"}
                                                                            </h6>
                                                                            <div className='flex justify-start gap-x-6 flex-wrap gap-y-2'>
                                                                                <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Index: <span className='text-slate-500 dark:text-zink-200'>{e.index}</span>
                                                                                </p>
                                                                                <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Item Type: <span className='text-slate-500 dark:text-zink-200'>{e.itemType}</span>
                                                                                </p>
                                                                                    <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Show Type: <span className='text-slate-500 dark:text-zink-200'>{e.showType}</span>
                                                                                </p>
                                                                                    <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Limit: <span className='text-slate-500 dark:text-zink-200'>{e.limit}</span>
                                                                                </p>
                                                                                    <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Redirect: <span className='text-slate-500 dark:text-zink-200'>{e.redirect}</span>
                                                                                </p>

                                                                            </div>

                                                                            {/* Item list modal */}
                                                                            <ItemsList data={e.items} />
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                </Draggable>
                                    })
                                }
                            {provided.placeholder}
                        </div>
                    )}
                  </Droppable>
                </div>
                <div className='h-3/4 overflow-y-scroll p-4 custom-scrollbar'>
                <Droppable droppableId='right'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h6 className='mb-6'>New Ordered Items</h6>
                                {
                                    rightState && rightState.cards?.map((e, index) => {
                                          const cardBgStyle = getStyle(e.backGround);
                                          return <Draggable
                                                    draggableId={String(e.id)}
                                                    index={index}
                                                    key={e.id}
                                                    >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className="card">
                                                                        <div className={cardBgStyle}>
                                                                            <h6 className="text-15">
                                                                                {e.backGround ? e.backGround : "No background"}
                                                                            </h6>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <h6 className="mb-4 text-15">
                                                                                {e.title ? e.title : "No title"}
                                                                            </h6>
                                                                            <div className='flex justify-start gap-x-6 flex-wrap gap-y-2'>
                                                                                <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Index: <span className='text-slate-500 dark:text-zink-200'>{e.index}</span>
                                                                                </p>
                                                                                <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Item Type: <span className='text-slate-500 dark:text-zink-200'>{e.itemType}</span>
                                                                                </p>
                                                                                    <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Show Type: <span className='text-slate-500 dark:text-zink-200'>{e.showType}</span>
                                                                                </p>
                                                                                    <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Limit: <span className='text-slate-500 dark:text-zink-200'>{e.limit}</span>
                                                                                </p>
                                                                                    <p className="text-slate-800 dark:text-zink-600  flex justify-center items-center gap-x-2">
                                                                                    Redirect: <span className='text-slate-500 dark:text-zink-200'>{e.redirect}</span>
                                                                                </p>

                                                                            </div>

                                                                            {/* Item list modal */}
                                                                            <ItemsList data={e.items} />
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                </Draggable>
                                    })
                                }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>
        </DragDropContext>
    );

};


interface IProps {
    setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>
    openAddForm: boolean;
    openMobilePreview: boolean;
    setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenMobilePreview: React.Dispatch<React.SetStateAction<boolean>>;
};
export const HomeSectionsLib = (props: IProps) => {
    
    const [data, setData] = useState<Paginated<GetHomeManager[]>>();
    const dispatch = useDispatch<any>();
    const [leftState, setLeftState] = useState<CardsState>({ cards: []});
    const [rightState, setRightState] = useState<CardsState>({ cards: [] });
    const [newOrderedList, setNewOrderedList] = useState<CardsState>({cards: []});


    const selectDataList = createSelector(
        (state: any) => state.Ecommerce,
        (state) => ({
            dataList: state.homeManager
        })
    );

    const handleAddContent = () => {
        props.setIsEmpty(false);
        props.setOpenAddForm(true);
    };

    const handleMobilePreview = () => { 
        props.setOpenAddForm(false);
        props.setOpenMobilePreview(true);
    }; 
    const handleSubmitChanges = async () => {
      try {
          await dispatch(onUpdateHomeManager({ newIndexes: newOrderedList.cards?.map((e, index) => ({ id: e.id, index: index })) }));
          await dispatch(onGetHomeManager()); // fetch new data
      } catch (error) {
        console.log(error);
        
      }
        
        return;
    }

    const { dataList } = useSelector(selectDataList);


     // Get Data
    useEffect(() => {
        dispatch(onGetHomeManager());
    }, [dispatch]);

    useEffect(() => {
        setData(dataList);
    }, [dataList]);

    useEffect(() => { 
       
        if (data) {
            props.setIsEmpty(false);
            Array.isArray(data.results) ? setLeftState({ cards: data.results }) : setLeftState({ cards: [] }); 
            setRightState({ cards: [] });
        }
    }, [data]);

    return (
        <div className='h-full'>
            <div className='flex gap-x-4 mb-6 justify-between'>
                <div className='flex gap-x-4 mx-8'>
                    <button
                        type="button"
                        autoFocus
                        onClick={handleAddContent}
                        className="text-custom-500 btn bg-custom-100 hover:text-white hover:bg-custom-600 focus:text-white focus:bg-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:ring active:ring-custom-100 dark:bg-custom-500/20 dark:text-custom-500 dark:hover:bg-custom-500 dark:hover:text-white dark:focus:bg-custom-500 dark:focus:text-white dark:active:bg-custom-500 dark:active:text-white dark:ring-custom-400/20">
                          Add New Item
                    </button>
                    <button
                        type="button"
                        onClick={handleMobilePreview}
                        className="text-white bg-orange-500 border-orange-500 btn hover:text-white hover:bg-orange-600 hover:border-orange-600 focus:text-white focus:bg-orange-600 focus:border-orange-600 focus:ring focus:ring-orange-100 active:text-white active:bg-orange-600 active:border-orange-600 active:ring active:ring-orange-100 dark:ring-orange-400/10">
                        Preview
                    </button>
                </div>
            
                <button
                    onClick={handleSubmitChanges}
                    type="button"
                    className="mx-8 text-green-500 bg-green-100 btn hover:text-white hover:bg-green-600 focus:text-white focus:bg-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:ring active:ring-green-100 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-white dark:focus:bg-green-500 dark:focus:text-white dark:active:bg-green-500 dark:active:text-white dark:ring-green-400/20">
                    Submit Changes
                </button>
      
            </div>
            <div className="rounded-lg p-4 h-full">
                {
                    data && data.results && data.results.length > 0 && <DND setNewOrderedList={setNewOrderedList} leftState={leftState} setLeftState={setLeftState} rightState={rightState} setRightState={setRightState} />
                }
                
            </div>
        </div>
    );
}


