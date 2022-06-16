import React from 'react';
import Container from './Container';
import Article from './Article';
import DocumentContainer from './DocumentContainer';
import SingleChildContainer from './SingleChildContainer';
import MultiChildContainer from './MultiChildContainer';

const Newspaper = props =>{
    return (
        <div>
            <Container>
                <Article headline='An interesting Article 1'>
                    1 Content Here
                </Article>
            </Container>
            <Container>
                <Article headline='An interesting Article 1.1'>
                    1.1 Content Here
                </Article>
                <Article headline='An interesting Article 1.2'>
                    1.2 Content Here
                </Article>
            </Container>
            <DocumentContainer>
                <Article headline='An interesting Article 2.1'>
                    2.1 Content Here
                </Article>
                <Article headline='An interesting Article 2.2'>
                    2.2 Content Here
                </Article>
            </DocumentContainer>
            <SingleChildContainer>
                <Article headline='An interesting Article 3'>
                    3. Content Here
                </Article>
            </SingleChildContainer>
            <MultiChildContainer component={'div'}>
                <Article headline='An interesting Article 4.1'>
                    4.1 Content Here
                </Article>
                <Article headline='An interesting Article 4.2'>
                    4.2 Content Here
                </Article>
            </MultiChildContainer>
        </div>
    );
}

export default Newspaper;