import type { ComponentProps, FC } from 'react';

type Props = ComponentProps<'input'> & {
	style?: React.CSSProperties;
};

export const InputForm: FC<Props> = (props) => {
	const { style, placeholder } = props;

	return <input style={style} placeholder={placeholder} />;
};
