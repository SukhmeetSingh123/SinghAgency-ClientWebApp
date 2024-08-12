import React from 'react';

const FinalOrderPopUp = ({ product, quantity, onClose, onOrder, alreadyAddedQuantity }: any) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full relative">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="mb-4 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 mb-4">
                        <img
                            src={`data:image/jpeg;base64,${product.item_Image}`}
                            alt={product.item_Name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-lg">Product: {product.item_Name}</p>
                        <p className="text-gray-600">Price: ₹{product.item_Price}</p>
                        {alreadyAddedQuantity > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                                <hr className="h-px bg-gray-400 border-none my-2" />
                                {'Note: To adjust the quantity or remove the product you ordered, please visit your Orders page.'}
                                <hr className="h-px bg-gray-400 border-none my-2" />
                                <p className='text-black'>
                                    You already have {alreadyAddedQuantity} of this product in your ordered cart.
                                </p>
                            </p>
                        )}
                    </div>
                </div>
                <hr className="h-px bg-black border-none my-4" />
                <div className="mb-4">
                    <p className="font-semibold">Already Added Quantity: {alreadyAddedQuantity}</p>
                    <hr className="h-px bg-gray-400 border-none my-2" />
                    <p className="font-semibold">Current Quantity: {quantity}</p>
                    <hr className="h-px bg-gray-400 border-none my-2" />
                    <p className="font-semibold">Total Quantity: {quantity + alreadyAddedQuantity}</p>
                    <hr className="h-px bg-gray-400 border-none my-2" />
                    <p className="font-semibold">Total Price: ₹{product.item_Price * (quantity + alreadyAddedQuantity)}</p>
                    <hr className="h-px bg-black border-none my-4" />
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
                    >
                        Close
                    </button>
                    <button
                        onClick={onOrder}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalOrderPopUp;
