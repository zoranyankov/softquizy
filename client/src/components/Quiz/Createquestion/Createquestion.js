import './Createquestion.css';

const Createquestion = (props) => {
    return (
        <div>
            <form action="" method="post" className="create-form">
                <h2 className="form-signin-heading">Create local Question</h2>

                {/* <br />
                <label htmlFor="amount">Number of Questions:</label>
                <br />
                <input type="number" name="amount" id="amount" className="form-control" min="1" max="50" value="10" />

                <br /> */}

                <br />
                <label htmlFor="category">Select Category: </label>
                <br />
                <select name="category" className="form-control">
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>

                <br />

                <br />
                <label htmlFor="difficulty">Select Difficulty: </label>
                <br />
                <select name="difficulty" className="form-control">
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <br />

                <br />
                <label htmlFor="question">Write the question: </label>
                <br />
                <input type="text" className="form-control" placeholder="Who (Where / What) is the...?" name="question"  />
                {/* value={this.state.password} onChange={this.handleChange} /> */}

                <br />
                
                <br />
                <label htmlFor="correct_answer">Write the correct answer: </label>
                <br />
                <input type="text" className="form-control" placeholder="Correct answer is..." name="correct_answer"  />
                {/* value={this.state.password} onChange={this.handleChange} /> */}

                <br />

                <br />
                <label htmlFor="scorrect_answers">Write the wrong answers: </label>
                <br />
                <input type="text" className="form-control" placeholder="Some wrong answer 1 / Some wrong answer 2 / Some wrong answer 3..." name="incorrect_answers"  />
                {/* value={this.state.password} onChange={this.handleChange} /> */}

                <br />

                {/* <br />
                <label htmlFor="type">Select Type: </label>
                <br />
                <select name="type" className="form-control">
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>

                <br /> */}

                {/* <br />
                <label htmlFor="encode">Select Encoding: </label>
                <br />
                <select name="encode" className="form-control">
                    <option value="default">Default Encoding</option>
                    <option value="urlLegacy">Legacy URL Encoding</option>
                    <option value="url3986">URL Encoding (RFC 3986)</option>
                    <option value="base64">Base64 Encoding</option>
                </select>

                <input type="hidden" name="token" value="67235e41e438b551ab682c633cd1a439a3f8d55a6cd854a02e044a0c3a05ba3a" /> */}

                <br />
                <br />

                <button className="btn create-btn" type="submit">Create Question</button>
                {/* <button className="btn btn-lg btn-primary btn-block create-btn" type="submit">Create Question</button> */}
            </form>
        </div>
    );
}

export default Createquestion;