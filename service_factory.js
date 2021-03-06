// **********************************************************************
//
// Copyright (c) 2003-2016 ZeroC, Inc. All rights reserved.
//
// This copy of Ice is licensed to you under the terms described in the
// ICE_LICENSE file included in this distribution.
//
// **********************************************************************
//
// Ice version 3.6.2
//
// <auto-generated>
//
// Generated from file `service_factory.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

(function(module, require, exports)
{
    var Ice = require("ice").Ice;
    var __M = Ice.__M;
    var Slice = Ice.Slice;

    var SRV = __M.module("SRV");

    SRV.CoolResultListener = Slice.defineObject(
        undefined,
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::SRV::CoolResultListener"
        ],
        -1, undefined, undefined, false);

    SRV.CoolResultListenerPrx = Slice.defineProxy(Ice.ObjectPrx, SRV.CoolResultListener.ice_staticId, undefined);

    Slice.defineOperations(SRV.CoolResultListener, SRV.CoolResultListenerPrx,
    {
        "onResult": [, , , , , , [[3]], , , , ]
    });

    SRV.CoolService = Slice.defineObject(
        undefined,
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::SRV::CoolService"
        ],
        -1, undefined, undefined, false);

    SRV.CoolServicePrx = Slice.defineProxy(Ice.ObjectPrx, SRV.CoolService.ice_staticId, undefined);

    Slice.defineOperations(SRV.CoolService, SRV.CoolServicePrx,
    {
        "SetListener": [, , , , , , [["SRV.CoolResultListenerPrx"]], , , , ],
        "ApplyValue": [, , , , , , [[3]], , , , ]
    });

    SRV.ServiceFactory = Slice.defineObject(
        undefined,
        Ice.Object, undefined, 1,
        [
            "::Ice::Object",
            "::SRV::ServiceFactory"
        ],
        -1, undefined, undefined, false);

    SRV.ServiceFactoryPrx = Slice.defineProxy(Ice.ObjectPrx, SRV.ServiceFactory.ice_staticId, undefined);

    Slice.defineOperations(SRV.ServiceFactory, SRV.ServiceFactoryPrx,
    {
        "GetCoolService": [, , , , , ["SRV.CoolServicePrx"], , , , , ]
    });
    exports.SRV = SRV;
}
(typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? module : undefined,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? require : this.Ice.__require,
 typeof(global) !== "undefined" && typeof(global.process) !== "undefined" ? exports : this));
