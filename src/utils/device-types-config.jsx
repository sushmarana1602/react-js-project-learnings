export const ChartConfigs =  {
    line: {
        name: 'Line Chart',
        icon: '/images/line-chart-icon.png',
        supportedDeviceTypes: '*',
        multipleDeviceSupport: true,
        sizes: {
            '12x24': 'Full Width',
            '6x24': 'Half Width'
        }
    },
    bar: {
        name: 'Condensed FFT (vibration sensor only)',
        icon: '/images/bar-chart-icon.png',
        supportedDeviceTypes: [23],
        multipleDeviceSupport: false,
        sizes: {
            '12x24': 'Full Width'
        }
    }
};
