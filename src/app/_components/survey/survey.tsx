import './survey.css';

interface SurveyQuestion {
	question: string
	hint?: string
	type: string
	options?: string[]
}

const surveyQuestions: SurveyQuestion[] = [{
	"question": "What forms of media do you prefer?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Film", "Television", "Social", "Written Word", "Music", "Art", "Interactive", "All of the above"
	]
}, {
	"question": "What does relaxing look like to you?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Staying home in the quiet", "Going into nature", "Going out to eat or drink", "Attending sports events", "Attending a performance", "All of the above"
	]
}, {
	"question": "Are you prone to solitude or company?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"Solitude", "Company", "50/50",
	]
}, {
	"question": "What genre of media do you prefer?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Action", "Fantasy", "Sci Fi", "Noir", "Thriller", "Modern", "Dystopian"
	]
}, {
	"question": "What do you expect most out of a TTRPG?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"Roleplay", "Combat", "Exploration"
	]
}, {
	"question": "How do you prefer to play?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"Online", "In-Person", "Blended"
	]
}, {
	"question": "What about playing a TTRPG interests you the most?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"Playing with friends", "Going on fantastical adventures", "Unique challenges and puzzles", "Interactive storylines", "Combat and Boss battles", "All of the Above"
	]
}, {
	"question": "Would you mind giving us your email so we can stay in touch?",
	"type": "input",
}, {
	"question": "What time zone are you in?",
	"hint": "(Select as many as you like)",
	"type": "checkbox",
	"options": [
		"CDT", "EST", "MST", "PDT"
	]
}, {
	"question": "What is your name?",
	"type": "input"
}, {
	"question": "What are your pronouns?",
	"hint": "(Select up to 1)",
	"type": "radio",
	"options": [
		"She/Her", "He/Him", "They/Them", "Other"
	]
}, {
	"question": "Please enter your Discord handle here. We will send you an invite to our private company server.",
	"type": "input"
}
];

export default function Survey() {

	const renderHint = (hint: string | undefined) => {
		if (hint) {
			return <>{hint}<br /></>
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
				return renderRadios(surveyQuestion.question, surveyQuestion.options);
			case "checkbox":
				return renderCheckboxes(surveyQuestion.options);
		}
	}

	const renderInput = (surveyQuestion: SurveyQuestion) => {
		return (
			<><input type="text"/><br /></>
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
			<div key={index}><input type="checkbox" id={option} name={option} value={option}/>{option}</div>
		)
	}

	const renderRadio = (name: string, option: string, index: number) => {
		return (
			<div key={index}><input type="radio" name={name} value={option}/>{option}</div>
		)
	}

	return (
		<div className="survey">
			<h2>Player Response Form</h2>
			<p>This form helps us to match you to your perfect GM (or closest we can get).
				It will help us identify your play style and expectations when coming to a table.
			</p>
			{surveyQuestions.map((surveyQuestion: SurveyQuestion, index: number) => {
				return (
					<div className="question" key={index}>
						{surveyQuestion.question}<br />
						{renderHint(surveyQuestion.hint)}
						{surveyQuestion.type === 'input' ? renderInput(surveyQuestion) : renderOptions(surveyQuestion)}
					</div>
				)
			})}
			<br />
			<button>Submit</button><br />
			<i>Never submit sensitive personal information, like passwords.</i>
		</div>
	)
}
