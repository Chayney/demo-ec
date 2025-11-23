import { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';

type Option = {
	id: number;
	label: string;
};

type CheckboxDropdownProps = {
	options: Option[];
	selected: number[];
	onChange: (selected: number[]) => void;
	placeholder?: string;
};

export const CheckboxDropdown = ({
	options,
	selected,
	onChange,
	placeholder,
}: CheckboxDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [filterText, setFilterText] = useState('');
	const containerRef = useRef<HTMLDivElement>(null);

	const [internalSelected, setInternalSelected] = useState<number[]>(() => selected ?? []);

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', onClickOutside);
		return () => document.removeEventListener('mousedown', onClickOutside);
	}, []);

	const toggleOption = (id: number) => {
		let updated: number[];
		if (internalSelected.includes(id)) {
			updated = internalSelected.filter((v) => v !== id);
		} else {
			updated = [...internalSelected, id];
		}
		setInternalSelected(updated);
		onChange(updated);
	};

	const filteredOptions = options.filter((opt) =>
		opt.label.toLowerCase().includes(filterText.toLowerCase()),
	);

	const displayLabel =
		internalSelected.length === 0
			? placeholder
			: options
					.filter((opt) => internalSelected.includes(opt.id))
					.map((opt) => opt.label)
					.join(', ');

	return (
		<div ref={containerRef} className={styles.container}>
			{/* トリガー */}
			<div onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
				<span>{displayLabel}</span>
				<span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : styles.arrowClosed}`}>
					▼
				</span>
			</div>

			{/* ドロップダウン */}
			{isOpen && (
				<div role="listbox" className={styles.dropdown}>
					{/* 検索ボックス */}
					<input
						type="text"
						placeholder="検索"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
						className={styles.searchInput}
						autoFocus
					/>

					{/* チェックボックスリスト */}
					{filteredOptions.length > 0 ? (
						filteredOptions.map((opt) => (
							<label key={opt.id} className={styles.optionLabel}>
								<input
									type="checkbox"
									checked={internalSelected.includes(opt.id)}
									onChange={() => toggleOption(opt.id)}
									className={styles.optionCheckbox}
								/>
								{opt.label}
							</label>
						))
					) : (
						<div className={styles.noMatch}>該当なし</div>
					)}
				</div>
			)}
		</div>
	);
};
