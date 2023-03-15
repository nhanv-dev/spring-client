import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {makeStyles} from '@material-ui/core/styles';

function Editor({value, setValue}) {
    const useStyles = makeStyles((theme) => ({
        richTextEditor: {
            "& .ck-editor__main > .ck-editor__editable": {
                minHeight: "350px"
            }
        }
    }));
    const classes = useStyles();

    return (
        <div className={classes.richTextEditor}>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                    setValue(editor.getData())
                }}
                height="300"
            />
        </div>
    );
}

export default Editor;
