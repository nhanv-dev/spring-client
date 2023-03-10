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
            'primary-hover': '#0a68ff',
            'primary-1': '#0060ff1f',
            'primary-1-hover': '#0060ff1f',
            'secondary':'#808089',
            'secondary-hover':'#27272a1f',
            'black': '#000',
            'black-1': '#38383d',
            'black-2': '#3f4b53',
            'red': '#d0011b',
            'gray': '#6f787e',
            'white': '#fff',
            'border': '#f7f7f7',
            'border-1': '#00000024',
            'rating': '#e4a400',
            'app-1': '#F5F5FA',
            'app-2': '#efefef',
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
            '2xl': '1.4rem',
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