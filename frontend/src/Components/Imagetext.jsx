import React, { useState } from 'react'
import Tesseract from 'tesseract.js';


const Imagetext = () => {

    const [isLoading, setisLoading] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [progress, setProgress] = useState("0");
    const handleClick = () => {
        setisLoading(true);
        Tesseract.recognize(
            image,
            'eng',
            {
                logger: m => {
                    console.log(m);
                    if (m.status == 'recognizing text') {
                        setProgress(parseInt(m.progress * 100))
                    }
                }
            }
        ).then(({ data: { text } }) => {
            setText(text);
            setisLoading(false);
        })
    }
    return (
        <div className='container' style={{ height: "100vh", width: "160vh" }}>
            <div className='row h-100'>
                <div className='col-md-5 mx-auto d-flex flex-column align-items-center' >
                    {!isLoading && <h1 className="mt-5 mb-4 pb-5 ">Image to Text</h1>}
                    {/*form*/}
                    {
                        !isLoading && !text &&
                        <>
                            <input type="file" className='form-control mt-5' onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}></input>
                            <input type="button" className='form-control btn btn-primary at-4 mt-3' value="Convert" onClick={handleClick} />
                        </>
                    }
                    {/*progressbar*/}
                    {
                        isLoading && (
                            <>
                                
                                <p className='text-center mt-5'> Converting :- {progress}%</p>
                                <progress className="form-control mt-5" value={progress} max="100">
                                    {progress}%{' '}
                                </progress>{' '}
                            </>
                        )
                    }
                    {/*text area*/}
                    {
                        !isLoading && text && (
                            <>
                                <textarea className='form-control' rows='15' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Imagetext
