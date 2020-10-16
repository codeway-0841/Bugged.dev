import React from 'react';
import Layout from 'components/Layout';

const custom404 = () => {
	return (
		<Layout primary>
			<h3 className="m-4">
				Sorry<span role="img" aria-label="emoji">
					🐞
				</span>, I didn't found what You need.
			</h3>
		</Layout>
	);
};

export default custom404;
