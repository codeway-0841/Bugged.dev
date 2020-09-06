import React, { Fragment } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout';

const custom404 = () => {
	return (
		<Layout primary>
			<h3 className='m-4'>Sorry🐞, I didn't found what You need.</h3>
		</Layout>
	);
};

export default custom404;
