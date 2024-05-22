import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Link } from 'react-router-dom';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

let idCounter = 0;
const generateId = () => {
    return `partition-${idCounter++}`;
};

const Partition = ({ id, color, direction, children, onSplit, onRemove, isRoot }) => {
    return (
        <ResizableBox
            className={`relative ${direction === 'V' ? 'flex-row' : 'flex-col'} flex-1 rounded-lg shadow-2xl`}
            width={direction === 'V' ? 200 : '100%'}
            height={direction === 'H' ? 200 : '100%'}
            minConstraints={[50, 50]}
            maxConstraints={[Infinity, Infinity]}
            resizeHandles={direction === 'V' ? ['e'] : ['s']}
            style={{ backgroundColor: color, display: 'flex', transition: 'background-color 0.3s ease' }}
        >
            {children ? (
                children.map(child => (
                    <Partition
                        key={child.id}
                        {...child}
                        onSplit={onSplit}
                        onRemove={onRemove}
                    />
                ))
            ) : (
                <div className="w-full h-full gap-5 flex justify-center items-center">
                    <button className="w-1/4 bg-white bg-opacity-80 border-none rounded px-2 py-1 cursor-pointer transition transform hover:bg-opacity-100 hover:scale-105 active:scale-95" onClick={() => onSplit(id, 'V')}>V</button>
                    <button className="w-1/4 bg-white bg-opacity-80 border-none rounded px-2 py-1 cursor-pointer transition transform hover:bg-opacity-100 hover:scale-105 active:scale-95" onClick={() => onSplit(id, 'H')}>H</button>
                    {!isRoot && <button className="absolute top-2 right-2 bg-white bg-opacity-80 border-none rounded px-2 py-1 cursor-pointer transition transform hover:bg-opacity-100 hover:scale-105 active:scale-95" onClick={() => onRemove(id)}>-</button>}
                </div>
            )}
        </ResizableBox>
    );
};

const Body = () => {
    const [partitions, setPartitions] = useState([{ id: generateId(), color: getRandomColor(), direction: null, children: null }]);

    const handleSplit = (id, direction) => {
        setPartitions(prevPartitions => {
            const newPartitions = JSON.parse(JSON.stringify(prevPartitions));
            const splitPartition = (partitions) => {
                for (const partition of partitions) {
                    if (partition.id === id) {
                        partition.children = [
                            { id: generateId(), color: partition.color, direction: null, children: null },
                            { id: generateId(), color: getRandomColor(), direction: null, children: null }
                        ];
                        partition.direction = direction;
                        return;
                    }
                    if (partition.children) {
                        splitPartition(partition.children);
                    }
                }
            };
            splitPartition(newPartitions);
            return newPartitions;
        });
    };

    const handleRemove = (id) => {
        setPartitions(prevPartitions => {
            const newPartitions = JSON.parse(JSON.stringify(prevPartitions));
            const removePartition = (partitions, parent) => {
                for (let i = 0; i < partitions.length; i++) {
                    if (partitions[i].id === id) {
                        if (parent) {
                            parent.children.splice(i, 1);
                            if (parent.children.length === 0) {
                                parent.children = null;
                            }
                        } else {
                            partitions.splice(i, 1);
                        }
                        return true;
                    }
                    if (partitions[i].children) {
                        if (removePartition(partitions[i].children, partitions[i])) {
                            return true;
                        }
                    }
                }
                return false;
            };
            removePartition(newPartitions, null);
            return newPartitions;
        });
    };

    return (
        <div>
            <Link to="/alphabet"><h1 className='text-xl text-red-500 font-semibold'>Alphabet Tile Interaction</h1></Link>
            <div className='font-semibold text-2xl mb-2 text-left'>
                <h1>Recursive Partitioning</h1>
                
            </div>
            <div className="flex flex-col h-screen bg-gray-300 rounded-lg w-full p-4">
                {partitions.map((partition, index) => (
                    <Partition
                        key={partition.id}
                        {...partition}
                        onSplit={handleSplit}
                        onRemove={handleRemove}
                        isRoot={index === 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
