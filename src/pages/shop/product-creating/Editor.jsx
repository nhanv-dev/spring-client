import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({product,value}) {

    return (
        <div className="editor">
            <CKEditor
                editor={ClassicEditor}
                data={product[value]}
                onChange={(event, editor) => {
                    product[value] = editor.getData();
                }}
            />
        </div>
    );
}

export default Editor;
