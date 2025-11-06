import type { ComponentProps, FC } from 'react'

type Props = ComponentProps<'textarea'> & {
    style?: React.CSSProperties
}

export const TextArea: FC<Props> = (props) => {
    const { style, placeholder } = props;

    return (
        <textarea style={style} placeholder={placeholder} />
    )
}