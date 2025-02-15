import { type MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getTotalPairingSessions } from '~/data/monthlyChallenges/pairing-challenge';
import { createMetaData } from '~/util/createMetaData.server';

export const handle = {
	meta: {
		title: 'Virtual Coffee Monthly Challenges',
		description:
			'Every month, we create a challenge for our Virtual Coffee members to complete together',
	},
	hero: {
		Hero: 'UndrawGoodTeam',
	},
};

type Challenge<T = any> = {
	title: string;
	subtitle: string;
	description?: React.ReactNode;
	loaderData?: () => Promise<T>;
	renderDescription?: (challengeData: T) => React.ReactNode;
	links?: { href: string; title: string }[];
	current?: boolean;
};

const challengeList: Challenge[] = [
	{
		title: 'Month of Learning',
		subtitle: `Time to learn new things!`,
		description: (
			<p>
				The goal this challenge is to learn something new, share what we have
				learned, and gather recommendations and resources to share with the
				community. During this challenge, we work on learning new dev-related
				things. You might deep-dive into one topic, start a small-group that
				focuses on community learning, focus on a new topic every week, or do a
				little bit of everything.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/jan-2023',
				title: 'January, 2023',
			},
			{
				href: '/monthlychallenges/jan-2022',
				title: 'January, 2022',
			},
			{
				href: '/monthlychallenges/jan-2021',
				title: 'January, 2021',
			},
		],
	},

	{
		title: 'Get job ready',
		subtitle: `Resumes, Cover Letters, and Elevator Pitch. There's never a bad time to update your job application materials.`,
		description: (
			<p>
				The goal of this challenge is to work on creating, revising, or updating
				your job packet materials and that elevator pitch that might get you in
				the door. Your resume, cover letter, and elevator pitch should work
				together to tell your story and represent where you are on your career
				journey; each piece should complement the others. This challenge
				emphasizes taking time to make sure they work together or to get some
				extra feedback on what you've worked on.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/feb-2023',
				title: 'February, 2023',
			},
			{
				href: '/monthlychallenges/apr-2022',
				title: 'April, 2022',
			},
			{
				href: '/monthlychallenges/mar-2021',
				title: 'March, 2021',
			},
		],
	},

	{
		title: 'Creative Community Challenge',
		subtitle: `Let's make some space for the other parts of ourselves.`,
		description: (
			<p>
				Devs are more than just the code we write. This challenge is all about
				embracing self-expression. Give back to yourself by indulging in
				something just for fun. Share the art, music, poetry, sports, games, or
				any other hobbies that spark joy for you. We spend so much time grinding
				away on understanding things in the tech space. Let's make some space
				for the other parts of ourselves. In this challenge, we encourage folks
				to spend time working on things that aren't necessarily code specific,
				or using code to improve other hobbies and outlets.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/dec-2022',
				title: 'December, 2022',
			},
			{
				href: '/monthlychallenges/dec-2021',
				title: 'December, 2021',
			},
		],
	},
	{
		title: 'Blogging Challenge',
		subtitle: `A Community Challenge to hit a word count goal for all our tech blogs.`,
		description: (
			<p>
				Based off the NaNoWriMo (National Novel Writing Month) Challenge, this
				challenge is the tech take on writing and working together towards the
				goal while posting on our own blogs.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/nov-2022',
				title: 'November, 2022',
			},
			{
				href: '/monthlychallenges/nov-2021',
				title: 'November, 2021',
			},
			{
				href: '/monthlychallenges/nov-2020',
				title: 'November, 2020',
			},
		],
	},
	{
		title: 'Hacktoberfest',
		subtitle: `Participate in open source, learn, and have fun!`,
		description: (
			<p>
				This challenge is always run during October and was our first ever
				monthly challenge. We have three tracks: maintainers will provide issues
				labeled for Hacktoberfest, contributors will solve issues, and mentors
				will help contributors and maintainers be successful.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/oct-2022',
				title: 'October, 2022',
			},
			{
				href: '/monthlychallenges/oct-2021',
				title: 'October, 2021',
			},
		],
	},
	{
		title: 'Preptember',
		subtitle: `Get your open source projects ready!`,
		description: (
			<p>
				Maintainers will be reviewing their open source repos with our checklist
				to make sure their projects are ready for Hacktoberfest contributions,
				and our contributors will be looking at their favorite repos, evaluating
				them based on the guide, and writing good issues as needed to fulfill
				the criteria.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/sept-2022',
				title: 'September, 2022',
			},
			{
				href: '/monthlychallenges/sept-2021',
				title: 'September, 2021',
			},
		],
	},
	{
		title: 'Healthy Habits for Happy Devs',
		subtitle: `This month's challenge is all about nourishing our bodies, minds, and spirits so that we can become healthier developers.`,
		description: (
			<p>
				The goal of this challenge is to build a new habit that will make you a
				healthier dev; this can be mind and body centered (drink, move, read,
				meditate, rearrange your work station) or code centered (review your
				ReadMe, clean your code, refresh your GitHub repo) or both. Set the goal
				for yourself this month and define what successfully completing the
				challenge looks like. For example, could be something like: review the
				README in 5 of your projects (one every week) or run 2k twice a week.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/aug-2022',
				title: 'August, 2022',
			},
			{
				href: '/monthlychallenges/aug-2021',
				title: 'August, 2021',
			},
		],
	},
	{
		title: 'Build in Public',
		subtitle: `Communicate what you're working on, show your development, and be confident and proud of any progress made.`,
		description: (
			<p>
				In this challenge, we're working on creating a habit of talking about
				the things we're working on, a plan for continuing progress, and
				creating a demo for the Virtal Coffee community.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/july-2022',
				title: 'July, 2022',
			},

			{
				href: '/monthlychallenges/july-2021',
				title: 'July, 2021',
			},
			{
				href: '/monthlychallenges/june-2021',
				title: 'June, 2021',
			},
		],
	},
	{
		title: 'Community Kindness',
		subtitle: `Celebrating our Community as we move into a new year of Virtual Coffee!`,
		description: (
			<p>
				As we work hard to make sure this community continues to be the special
				and close-knit group, this challenge encourages our members to celebrate
				one of the things that continually makes this community so special:
				Kindness. Some of the ways we see this include: practicing gratitude,
				reaching out to support other members, mentoring, helping, giving honest
				and constructive feedback, and continuing to make Virtual Coffee a safe
				and supportive space.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/may-2022',
				title: 'May, 2022',
			},
			{
				href: '/monthlychallenges/apr-2021',
				title: 'April, 2021',
			},
		],
	},
	{
		title: 'Creating Audio/Visual content',
		subtitle: `Create a community of knowledge sharing and access to learning with AV content.`,
		description: (
			<p>
				For this challenge, members present their knowledge and showcase your
				understanding by exploring video and audio mediums for sharing
				knowledge, highlighting their achievements. They might do that by giving
				lunch-and-learns, youtube videos, podcasts, or some other form of audio
				or video content they created that explores a coding-related
				concept--there's no length requirement. We believe this provides value
				by solidifying ideas, creating a resource for others, inviting personal
				growth through conversations sparked by sharing, and demonstrating your
				ability to talk through a concept.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/mar-2022',
				title: 'March, 2022',
			},
			{
				href: '/monthlychallenges/feb-2021',
				title: 'February, 2021',
			},
		],
	},
	{
		current: true,
		title: 'Pairing',
		subtitle: `Pairing is more than just coding with someone else. Pairing is about communication, teaching, learning, positive reinforcements, and growing.`,
		renderDescription: (totalSessions: number) => {
			return (
				<>
					<p>
						For this community challenge, we're trying to hit 30 pairing sessions by the end of the month. Some ways to get started pairing are by working on
						an open-source issue, a LeetCode problem, or a project you need
						help on. Check out <a href="https://dev.to/virtualcoffee/the-power-of-pair-programming-benefits-types-and-tips-1h4c">The Power of Pair Programming: Benefits, Types, and Tips</a> for more on why you should pair up with us this May!
					</p>
					<p>This challenge is sponsored by <a href="https://tuple.app/">Tuple</a>, the remote pair programming app on macOS and Linux.</p>
					<h3 className="display-3">
						Current status: {totalSessions.toLocaleString()} out of 50 pairing
						sessions
					</h3>

					<div className="progress my-4" style={{ height: '3em' }}>
						<div
							className="progress-bar progress-bar progress-bar-striped"
							role="progressbar"
							style={{ width: `${(totalSessions / 50) * 100}%` }}
							aria-valuenow={totalSessions}
							aria-valuemin={0}
							aria-valuemax={50}
						>
							{totalSessions.toLocaleString()} Pairing Sessions
						</div>
					</div>
				</>
			);
		},
		links: [
			{
				href: '/monthlychallenges/feb-2022',
				title: 'February, 2022',
			},
			{
				href: '/monthlychallenges/dec-2020',
				title: 'December, 2020',
			},
		],
		loaderData: async (): Promise<number> => {
			const allPairingSesions = await getTotalPairingSessions();
			return allPairingSesions;
		},
	},
	{
		title: 'Month of Feedback',
		subtitle: `Giving and accepting meaningful and empathetic feedback.`,
		description: (
			<p>
				When we care about our community members, we can offer empathetic
				responses that are honest and allow them to grow and to fix a problem.
				Sometimes these conversations are hard. But sometimes we need hard
				conversations to help us grow. This challenge calls members to approach
				each other with kindness and honesty, and allow this kind of feedback to
				be a regular part of our process.
			</p>
		),
		links: [
			{
				href: '/monthlychallenges/june-2022',
				title: 'June, 2022',
			},

			{
				href: '/monthlychallenges/may-2021',
				title: 'May, 2021',
			},
		],
	},
];

const currentItem = challengeList.find((item) => item.current);

const filteredChallenges = currentItem
	? [currentItem, ...challengeList.filter((item) => !item.current)]
	: challengeList;

export async function loader() {
	const {
		meta: { title, description },
		hero: { Hero },
	} = handle;

	const returnData = {
		challengeData: undefined,
		meta: createMetaData({ title, description, Hero }),
	};

	if (currentItem?.loaderData) {
		const data = await currentItem.loaderData();
		returnData.challengeData = data;
	}

	return json(returnData);
}

export const meta: MetaFunction<typeof loader> = ({ data: { meta } }) => {
	return meta;
};

function ChallengeItem({
	challenge,
	challengeData,
}: {
	challenge: Challenge;
	challengeData: any;
}) {
	return (
		<>
			<dt className={challenge.current ? 'gridlist-current' : undefined}>
				{challenge.current && (
					<small className="d-block text-muted">Current Challenge: </small>
				)}{' '}
				{challenge.title}
			</dt>
			<dd className={challenge.current ? 'gridlist-current' : undefined}>
				<p className="gridlist-subtitle">{challenge.subtitle}</p>
				{challenge.description}
				{challenge.current &&
					challenge.renderDescription &&
					challenge.renderDescription(challengeData)}
				{challenge.links && challenge.links.length > 0 && (
					<>
						<h3>Resources and results from past challenges:</h3>
						<ul>
							{challenge.links.map((link) => (
								<li key={link.href}>
									<a href={link.href}>{link.title}</a>
								</li>
							))}
						</ul>
					</>
				)}
			</dd>
		</>
	);
}

export default function Index() {
	const { challengeData } = useLoaderData();
	return (
		<div>
			<div className="bg-white py-3">
				<div className="container">
					<h2>What are monthly challenges?</h2>

					<p>
						These monthly challenges provide members the opportunity to learn,
						grow, and receive support and mentorship. There will be a theme for
						each month's challenge and weekly goals for the members to work on.
						Instructions, resources, and additional help for the challenges is
						provided in the #monthly-challenge channel in slack. Along with our
						Maintainers, our Challenge Team Leads plan, organize, and facilitate
						these challenges.
					</p>

					<h2>Who can participate?</h2>

					<p>
						These challenges are available to all Virtual Coffee members and the
						goal is to support developers of all stages in their coding journey.
						To become a member of Virtual Coffee, all you need to do is{' '}
						<a href="/events">attend a Tuesday or Thursday Coffee</a> and submit
						the form you'll receive at coffee. After you submit the form, you
						will receive an invitation to join the slack group where you can
						share your progress on the challenges and ask questions.
					</p>
				</div>
			</div>

			<div className="bg-light py-5">
				<div className="container">
					<h2 className="display-5">Our challenges:</h2>
					<dl className="gridlist mt-4">
						{filteredChallenges.map((challenge) => (
							<ChallengeItem
								key={challenge.title}
								challenge={challenge}
								challengeData={challengeData}
							/>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
