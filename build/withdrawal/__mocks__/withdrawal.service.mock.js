"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WithdrawalServiceMock", {
    enumerable: true,
    get: function() {
        return WithdrawalServiceMock;
    }
});
const _withdrawalStubs = require("../test/stubs/withdrawalStubs");
const WithdrawalServiceMock = {
    request: jest.fn().mockImplementation((data)=>{
        return {
            ...data,
            id: 1
        };
    }),
    cancel: jest.fn().mockImplementation((id)=>{
        return {
            id: id,
            ...(0, _withdrawalStubs.WithdrawalRequest)()
        };
    }),
    status: jest.fn().mockImplementation((id)=>{
        return {
            id: id,
            status: 'pending'
        };
    })
};
