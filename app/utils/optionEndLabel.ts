export const endLabelConfig = {
    formatter: `{a|{a}}\n{hr|}\n  {b|{@[1]}} w `,
    borderColor: '#bbbbbb',
    borderWidth: 1,
    borderRadius: 5,
    rich: {
        a: {
            lineHeight: 18,
            align: 'center',
            fontWeight: 'bold',
        },
        hr: {
            borderColor: '#dbdcde',
            width: '100%',
            borderWidth: 1,
            height: 0,
            fontWeight: 'bold',
        },
        b: {
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 27,
        },
        per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 6],
            borderRadius: 3
        }

    }
}