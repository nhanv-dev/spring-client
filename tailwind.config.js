/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1300px',
        },
        colors: {
            'primary': '#0a68ff',
            'primary-hover': '#0060ff1f',
            'secondary':'#808089',
            'secondary-hover':'#27272a1f',
            'black-2': '#27272a',
            'black-1': '#3f4b53',
            'white': '#fff',
            'black': '#333',
            'border': '#dcdee3',
            'background': '#efefef',
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        fontSize: {
            'xs': '.775rem',
            'sm': '.8rem',
            'tiny': '.875rem',
            'md': '.9rem',
            'base': '1rem',
            'lg': '1.1rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '1300px',
            },
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                'tiny': '0 -2px 8px 0 rgb(0 0 0 / 10%), 0 4px 8px 0 rgb(0 0 0 / 10%)'
            },
            backgroundImage: {}
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}