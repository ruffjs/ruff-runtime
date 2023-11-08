#  Infrared Induction Module Driver

## Description
This is the driver for inftared induction module with GPIO interface e.g. HC-SR501. 

This driver will emit events when a person is nearby or away.

## Support Devices

[HC-SR501](http://rap.ruff.io/devices/HC-SR501)

## Usage

* Watch `nearby` events

```javascript
    $('infrared').on('nearby', function() {
        console.log('in infrared nearby');
    });
```

* Watch `away` events

```javascript
    $('infrared').on('away', function() {
        console.log('in infrared away');
    });

```

## API
### Events
* **nearby**   
Emitted when a person is nearby

* **away**   
Emitted when a person is away
