import React, { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrow from './assets/leftarrow.png';

import { Level, levels, calculate } from './helpers/imc';

import { GridItem } from './components/GridItem';

type Fields = {
	altura: number,
	peso: number,
}

const App = () => {
	const [fields, setFields] = useState<Fields>({
		altura: 0,
		peso: 0,
	});
	const { altura, peso } = fields;

	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setFields( { ...fields, [target.id]: target.value  } );
	}

	const [toShow, setToShow] = useState<Level | null>(null);

	const handleButtonClick = () => {
		if ( altura && peso ) {
			setToShow( calculate( altura, peso ) );
			return;
		}

		alert('Você deve preencher todos os campos');
	}

	const handleBackButton = () => {
		setToShow(null);
		setFields({
			altura: 0,
			peso: 0,
		});
	}

	return (
		<div className={styles.main}>
			<header>
				<div className={styles.headerContainer}>
					<img src={poweredImage} width={150} />
				</div>
			</header>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<h1>Calcule o seu IMC.</h1>
					<p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

					<input
						type="number"
						placeholder="Digite a sua altura (em metros). Ex: 1.5"
						value={ altura > 0 ? altura : '' }
						id="altura"
						onChange={ handleInputChange }
						disabled={toShow ? true : false}
					/>

					<input
						type="number"
						placeholder="Digite o seu peso (em kg). Ex: 75.4"
						value={ peso > 0 ? peso : '' }
						id="peso"
						onChange={ handleInputChange }
						disabled={toShow ? true : false}
					/>

					<button onClick={ handleButtonClick } disabled={toShow ? true : false}>Calcular</button>
				</div>
				<div className={styles.rightSide}>
					{!toShow && (
						<div className={styles.grid}>
							{ levels.map( ( item, index ) => (
								<GridItem key={index} item={item} />
							) ) }
						</div>
					)}
					{toShow && (
						<div className={styles.rightBig}>
							<div className={styles.rightArrow} onClick={handleBackButton}>
								<img src={leftArrow} width={25}  />
							</div>
							<GridItem item={toShow} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;