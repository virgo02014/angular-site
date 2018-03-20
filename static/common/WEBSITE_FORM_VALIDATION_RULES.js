var WEBSITE_FORM_VALIDATION_RULES = {
    common: {
            // ref: https://en.wikipedia.org/wiki/Telephone_numbers_in_China
            // https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%86%85%E5%9C%B0%E7%A7%BB%E5%8A%A8%E7%BB%88%E7%AB%AF%E9%80%9A%E8%AE%AF%E5%8F%B7%E7%A0%81
            mobilePhoneNumber: /^1\\d{10}$/,
            // mobilePhoneNumber: '/^((134\\d)|(13\\d)|(14[57])|(15\\d)|(170[015789])|(171[89])|(17[5678])|(18\\d))\\d{8}$/',
            landLinePhoneNumberPrecise: '/^0((10)|(2\\d)|(31\\d)|(335)|(35\\d)|(349)|(37[0-79])|(39[1-8])|(41[1256789])|(42[179])|(43[1-9])|(44[08])|(45[1-9])|(46[4789])|(47\\d)|(48[23])|(51\\d)|(52[37])|(53\\d)|(54[36])|(633)|(55\\d)|(56[12346])|(57\\d)|(580)|(59[1-9])|(63[1-58])|(66[0238])|(69[12])|(71\\d)|(72[248])|(73[4-901])|(74[3-6])|(75\\d)|(76[023689])|(77\\d)|(79\\d)|(701)|(81[23678])|(82[5-7])|(83\\d)|(85[4-91])|(87\\d)|(88[13678])|(89[1-8])|(91[1-79])|(93\\d)|(94[13])|(95[1-5])|(97\\d)|(99\\d)|(90[0123689]))\\d{8}$/',
            landLinePhoneNumberLoose: '/^0\\d{10, 11}$/',
            fixedPhoneNumber: '/^\\d{3}-\\d{7,8}|\\d{4}-\\d{7,8}$/',
            // ref: https://en.wikipedia.org/wiki/Toll-free_telephone_number
            tollFreePhomeNumber: '/^[48]00\\d{7}$/',
            validationQQ: '/^[1-9]\\d{4,9}$/',
            email: /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            email1: /^(\w+@\w.\w+)*$/,
            email2: /^[0-9]*[1-9][0-9]*$/, //不许为0
            phone: /^((0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})*$/
    },
    extendedRules: {
            __isUniqueEmail__: function(){
                 if(event && event.type === 'click'){
                    console.warn('__isUniqueEmail__');
                 }
                 return false;
            },
            isUniqueEmail: function(){
                if(!$.fn.form.settings.rules.isUniqueEmail){
                    $.fn.form.settings.rules.isUniqueEmail = this.__isUniqueEmail__;
                }
            }
    }
};
