import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({product}) {

    return (
        <div className="editor">
            <CKEditor
                editor={ClassicEditor}
                data={product.description}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    product.description = data;
                    // console.log({desc: product.description, data});
                }}
            />
        </div>
    );
}

export default Editor;
