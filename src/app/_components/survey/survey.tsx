import styles from './survey.module.css';

interface SurveyQuestion {
	id: string
	question: string
	hint?: string
	type: string
	options?: string[]
}

const surveyQuestions: SurveyQuestion[] = [{
	"id": "q1",
	"question": "What forms of media do you prefer?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Film", "Television", "Social", "Written Word", "Music", "Art", "Interactive", "All of the above"
	]
}, {
	"id": "q2",
	"question": "What does relaxing look like to you?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Staying home in the quiet", "Going into nature", "Going out to eat or drink", "Attending sports events", "Attending a performance", "All of the above"
	]
}, {
	"id": "q3",
	"question": "Are you prone to solitude or company?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"Solitude", "Company", "50/50",
	]
}, {
	"id": "q4",
	"question": "What genre of media do you prefer?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Action", "Fantasy", "Sci Fi", "Noir", "Thriller", "Modern", "Dystopian"
	]
}, {
	"id": "q5",
	"question": "What do you expect most out of a TTRPG?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"Roleplay", "Combat", "Exploration"
	]
}, {
	"id": "q6",
	"question": "How do you prefer to play?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"Online", "In-Person", "Blended"
	]
}, {
	"id": "q7",
	"question": "What about playing a TTRPG interests you the most?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Playing with friends", "Going on fantastical adventures", "Unique challenges and puzzles", "Interactive storylines", "Combat and Boss battles", "All of the Above"
	]
}, {
	"id": "q8",
	"question": "Would you mind giving us your email so we can stay in touch?",
	"type": "input",
}, {
	"id": "q9",
	"question": "What time zone are you in?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"CDT", "EST", "MST", "PDT"
	]
}, {
	"id": "q10",
	"question": "What is your name?",
	"type": "input"
}, {
	"id": "q11",
	"question": "What are your pronouns?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"She/Her", "He/Him", "They/Them", "Other"
	]
}, {
	"id": "q12",
	"question": "Please enter your Discord handle here. We will send you an invite to our private company server.",
	"type": "input"
}
];

export default function Survey() {

	const renderHint = (hint: string | undefined) => {
		if (hint) {
			return <div className={styles.hint}><i>{hint}</i></div>
		} else {
			return null;
		}
	}

	const renderOptions = (surveyQuestion: SurveyQuestion) => {
		if (surveyQuestion.options === undefined) {
			return null;
		}

		switch (surveyQuestion.type) {
			case "radio":
				return renderRadios(surveyQuestion.id, surveyQuestion.options);
			case "checkbox":
				return renderCheckboxes(surveyQuestion.options);
		}
	}

	const renderInput = (surveyQuestion: SurveyQuestion) => {
		return (
			<><input className={styles.input} name={surveyQuestion.id} type="text"/><br /></>
		)
	}

	const renderCheckboxes = (options: string[]) => {
		return (
			<div>
				{options.map((option: string, index: number) => {
					return renderCheckbox(option, index);
				})}
			</div>
		)
	}

	const renderRadios = (name: string, options: string[]) => {
		return (
			<div>
				{options.map((option: string, index: number) => {
					return renderRadio(name, option, index);
				})}
			</div>
		)
	}

	const renderCheckbox = (option: string, index: number) => {
		return (
			<div className={styles.checkbox} key={index}><input type="checkbox" id={option} name={option} value={option}/><p>{option}</p></div>
		)
	}

	const renderRadio = (name: string, option: string, index: number) => {
		return (
			<div className={styles.checkbox} key={index}><input type="radio" name={name} value={option}/>{option}</div>
		)
	}

	return (
		<div className={styles.survey}>
			<h2>Player Response Form</h2>
			<p>This form helps us to match you to your perfect GM (or closest we can get).
				It will help us identify your play style and expectations when coming to a table.
			</p>
			{surveyQuestions.map((surveyQuestion: SurveyQuestion, index: number) => {
				return (
					<div className={styles.question} key={index}>
						<div className={styles.question_text}>{surveyQuestion.question}</div>
						{renderHint(surveyQuestion.hint)}
						{surveyQuestion.type === 'input' ? renderInput(surveyQuestion) : renderOptions(surveyQuestion)}
					</div>
				)
			})}
			<br />
			<button>Submit</button><br /><br />
			<i>Never submit sensitive personal information, like passwords.</i>
		</div>
	)
}
