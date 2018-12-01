import get from 'lodash.get'
import reduce from 'lodash.reduce'

const staticFields = {
  '[name="data.issue.ext.compensation_type"]': () => 'Prisavdrag',
  '[name="data.issue.date"]': () => 'Idag',
  '[name="data.issue.time"]': () => {
    var d = new Date()
    var h = (d.getHours() < 10 ? '0' : '') + d.getHours()
    var m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()

    return h + ':' + m
  },
  '[name="data.issue.travel.type"]': 'delayInfo.type',
  '[name="data.issue.travel.destination"]': 'delayInfo.to',
  '[name="data.issue.comment"]': () => 'Testmeddelande! Betala ej ut.',
  // '[name="data.issue.comment"]': () => 'Hej! Jag försökte genomföra resan enligt det som angivits i formuläret men råkade ut för försening orsakad av er.',
  '[name="data.issue.ticket.type"]': () => 'Biljett på SL Access-kort',
  '[name="data.issue.ext.compensation_refound"]': () => 'Bankkonto',
  '[name="data.issue.contact.person_number"]': 'contactInfo.id',
  '[name="data.issue.contact.first_name"]': 'contactInfo.firstname',
  '[name="data.issue.contact.last_name"]': 'contactInfo.surname',
  '[name="data.issue.contact.address.care_of"]': 'contactInfo.co',
  '[name="data.issue.contact.address.street"]': 'contactInfo.address',
  '[name="data.issue.contact.address.zip_code"]': 'contactInfo.zip',
  '[name="data.issue.contact.address.city"]': 'contactInfo.city',
  '[name="data.issue.contact.address.country"]': 'contactInfo.country',
  '[name="data.issue.contact.email"]': 'contactInfo.email',
  '[name="data.issue.contact.phone"]': 'contactInfo.phone'
}

const dynamicFields = {
  '[name="data.issue.compensation.type.priceDeduction.delay"]': 'delayInfo.time',
  '#price_deduction_ticket_type': 'slCard.ticketType',
  '[name="data.traffic_line_range"]': ({ delayInfo: { type, line: { Number: line } } = {} } = {}) => {
    if (type !== 'Buss') return null

    if (line <= 293) return '1-293'
    if (line <= 532) return '301-532'
    if (line <= 648) return '533-648'
    if (line <= 795) return '649-795'

    return '796-986'
  },
  '#traffic_line': 'delayInfo.line.Number',
  '[data-ng-model="data.special.travel.from"]': 'delayInfo.from',
  '[data-ng-model="data.special.travel.to"]': 'delayInfo.to',
  '[name="data.issue.compensation.from"]': 'delayInfo.from',
  '[name="data.issue.compensation.to"]': 'delayInfo.to',
  '[name="travel_card.serial_number1"]': (data = {}) => data.slCard.cardNumber.substring(0, 5),
  '[name="travel_card.serial_number2"]': (data = {}) => data.slCard.cardNumber.substring(5),
  '[name="data.issue.compensation.refound.bank.clearing"]': 'bankAccount.clearingNumber',
  '[name="data.issue.compensation.refound.bank.account"]': 'bankAccount.account'
}

export const testData = {
  slCard: { ticketType: 'Årsbiljett, vuxen', cardNumber: '1234554321' },
  bankAccount: { type: 'Bankkonto', clearingNumber: '3300', account: '8002205964' },
  contactInfo: {
    id: '19800220-5964',
    firstname: 'Marcus',
    surname: 'Mson',
    co: 'Alissa A',
    address: 'Kungsgatan 2',
    zip: '12345',
    city: 'Nacka',
    country: 'Sverige',
    email: 'm@i.com',
    phone: '0791234556'
  },
  delayInfo: {
    type: 'Buss',
    line: { Number: '302' },
    from: 'Drottningholm',
    to: 'Brostugan',
    time: '20-39 minuter'
  }
}

const helperFunctions = `
function waitForElToExist(selector, handler, maxDelay) {
  var element = $(selector);
  
  if (typeof maxDelay === 'undefined') maxDelay = 10000;
  if (maxDelay < 0) return;
  
  if (element.length) {
    if ([
          '#traffic_line', 
          '[data-ng-model="data.special.travel.from"]',
          '[data-ng-model="data.special.travel.to"]'
        ].includes(selector)) {
      setTimeout(function() {
        handler($(selector))
      }, 1000);
    } else {
      handler(element);
    }
  } else {
    setTimeout(function() {
      waitForElToExist(selector, handler, maxDelay - 500);
    }, 500);
  }
}

function waitForElementToBeVisible(selector, handler, errorHandler, maxDelay) {
  var isVisible = $(selector).is(':visible');
  
  if (maxDelay <= 0) {
    errorHandler();
    return;
  }
  
  if (isVisible) {
    handler($(selector));
  } else {
    setTimeout(function() {
      waitForElementToBeVisible(selector, handler, errorHandler, maxDelay - 500);
    }, 500);
  }
}

function findValue(selector, value) {
  var el = $(selector);
  
  if (el.is('select')) {
    return $(selector + ' option:contains(' + value + ')').val();
  }
  
  return value;
}
`

export function convertDataToInstructions (data) {
  const staticFieldsScript = reduce(staticFields, (result, valueGetter, selector) => {
    const value = typeof valueGetter === 'function' ? valueGetter(data) : get(data, valueGetter)

    if (value === null) {
      return result
    }

    return `${result}$('${selector}').val(findValue('${selector}', '${value}')).change();\n`
  }, '')

  const dynamicFieldsScript = reduce(dynamicFields, (result, valueGetter, selector) => {
    const value = typeof valueGetter === 'function' ? valueGetter(data) : get(data, valueGetter)

    if (value === null) {
      return result
    }

    return `${result}
      waitForElToExist('${selector}', function(el) {
        el.val(findValue('${selector}', '${value}')).change();
      });
    `
  }, '')

  return `${staticFieldsScript}\n${dynamicFieldsScript}`
}

export function createScript (data) {
  return `
    (function() {
    /* onMessage patch */
    var originalPostMessage = window.postMessage;
    /* onMessage patch end */
    
    ${helperFunctions}
    
    ${convertDataToInstructions(data)}
    
    setTimeout(function() {
      $('.refund-form [type="submit"]').click();
    }, 5000); 
    
    waitForElementToBeVisible('#refundFormReceipt', function() {
      window.postMessage('OK'); 
    }, function() {
      var errorMessage = $('.refund-form .form-error p').text();
      window.postMessage(errorMessage);
    }, 10000);
    
    })();
  `
}
