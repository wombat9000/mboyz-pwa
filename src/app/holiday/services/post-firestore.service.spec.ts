import {TestBed} from '@angular/core/testing';
import {PostFirestore} from './post-firestore.service';
import {AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {AngularFirestoreDocument} from 'angularfire2/firestore/document/document';
import {Post} from '../models/post';
import {AngularFirestoreCollection} from 'angularfire2/firestore/collection/collection';
import {createChangeAction} from '../../test-support/functions';
import {DocumentChangeType} from '@firebase/firestore-types';
import {of} from 'rxjs/index';


describe('PostFirestore', () => {

  let testee: PostFirestore;
  let afs: jasmine.SpyObj<AngularFirestore>;

  const colRef = jasmine.createSpyObj<AngularFirestoreCollection<Post>>('AngularFirestoreCollection', ['valueChanges', 'stateChanges']);

  const somePost: Post = {
    id: 'someId',
    text: 'some text',
    authorId: 'author1',
    holidayId: 'holiday1',
    created: '1990'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostFirestore,
        {
          provide: AngularFirestore,
          useValue: jasmine.createSpyObj('AngularFireStore', ['collection', 'doc'])
        }]
    });

    testee = TestBed.get(PostFirestore);
    afs = TestBed.get(AngularFirestore);
  });

  describe('save', () => {
    const docRef = jasmine.createSpyObj<AngularFirestoreDocument<Post>>('AngularFirestoreDocument', ['set']);

    beforeEach(async () => {
      docRef.set.and.returnValue(Promise.resolve());
      afs.doc.and.returnValue(docRef);
      await testee.save(somePost);
    });

    it('should save to parent holiday document', async () => {
      expect(afs.doc).toHaveBeenCalledWith(`posts/${somePost.id}`);
    });

    it('should persist the post', () => {
      expect(docRef.set).toHaveBeenCalledWith(somePost);
    });
  });

  it('should observe state changes', (done) => {
    const added: DocumentChangeType = 'added';

    const documentChangeAction = createChangeAction(added, {});

    colRef.stateChanges.and.returnValue(of([documentChangeAction]));
    afs.collection.and.returnValue(colRef);

    testee.observeChanges().subscribe((it: DocumentChangeAction<any>) => {
      expect(afs.collection).toHaveBeenCalledWith(`posts`);
      expect(it).toEqual(documentChangeAction);
      done();
    });
  });
});
