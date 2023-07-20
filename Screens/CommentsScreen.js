import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { selectEmail } from '../Redux/Users/userSelectors';
import { useKeyboard } from 'react-native-keyboard-height';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useEffect, useState, createRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { selectComments } from '../Redux/Posts/postSelectors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchComments, addComments } from '../Redux/Posts/postOperations';
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  Keyboard,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

const Stack = createStackNavigator();

const CommentsScreen = ({fetchComments, addComments, comments, currentUser }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [newComment, setNewComment] = useState('');
  const [isKeyboardShown, setIsKeyboardShown] = useKeyboard();
  const { postId, avatarUrl, photo, userId } = route.params;
  const [isCommentFocused, setIsCommentFocused] = useState(false);

  useEffect(() => {
    async function getData() {
      await fetchComments(postId);
    }
    getData();
  }, [postId]);

  const handlePostComment = async () => {
    if (newComment !== '') {
      await addComments({
        commentText: newComment,
        avatarUrl: avatarUrl,
        postId: postId,
        userId: currentUser,
      });

      setNewComment('');
      dismissKeyboard();

      async function getData() {
        await fetchComments(postId);
      }
      getData();
    }
  };

  useEffect(() => {
    const handleGoBack = () => {
      navigation.goBack();
    };

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.arrowContainer} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}
      >
        <View style={styles.wrapper}>
          <Image source={{ uri: photo }} style={styles.postPhoto} />
          {comments && (
            <FlatList
              data={comments}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 32, marginBottom: 16 }}
              scrollEnabled={true}
              keyExtractor={(item) => item.id}      
              renderItem={({ item }) => (
                <View style={[
                      (item.userId === currentUser) ? 
                        styles.commentCardWrapper :
                          styles.myComment,
                  ]}>
                      {item.avatarUrl ? 
                          <Image source={{ uri: item.avatarUrl }} style={styles.userAvatar} />
                          : 
                          <View style={styles.iconWrapper}>
                              <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
                          </View>
                      }
                  
                  <View style={[
                      (item.userId === currentUser) ? 
                        styles.othersComment :
                          styles.myComentWrap,
                  ]}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.dateText}>{item.date.toLocaleDateString()}</Text>
                  </View>
                </View>
              )}
            />
          )}
          <View style={[
              styles.addCommentWrapper,
              isKeyboardShown && styles.keyboardOpen,
              ]}>
            <TextInput
              name="comment"
              value={newComment}
              onChangeText={(newComment) => setNewComment(newComment)}
              onFocus={() => setIsCommentFocused(true)}
              onBlur={() => setIsCommentFocused(false)}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              style={[
                styles.input,
                  isCommentFocused && styles.inputFocused,
              ]}
            />
            <TouchableOpacity onPress={handlePostComment} style={[
              styles.commentButton,
              newComment !== '' && styles.commentPresent,
            ]}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: headerHeight }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexGrow: 1,
  },
  arrowContainer: {
    marginLeft: 16,
  },
  postPhoto: {
    height: 240,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  addCommentWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 20,
  }, 
  myComment: {
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width - 32,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    borderStyle: "solid",
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 62,
    bottom: 16,
  },
  inputFocused: {
    color: "#212121",
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    textDecorationLine: "none",
  },
  commentButton: {
    position: "absolute",
    right: 16,
    width: 34,
    height: 34,
    backgroundColor: "rgba(189, 189, 189, 1)",
    borderRadius: 20,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 8,
    bottom: 8,
  },
  commentPresent: {
    position: "absolute",
    right: 16,
    top: 8,
    bottom: 8,
    width: 34,
    height: 34,
    backgroundColor: "rgba(255, 108, 0, 1)",
    borderRadius: 20,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 28,
    backgroundColor: "#F6F6F6",

  },
  commentCardWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 24,
    gap: 8,
  },
  myComment: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingBottom: 24,
    gap: 8,
  },
  userAvatar: {
    width: 34,
    height: 34,
    paddingRight: 16,
    borderRadius: 50,
  },
  othersComment: {
    minWidth: Dimensions.get('window').width - 68,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  myComentWrap: {
    minWidth: Dimensions.get('window').width - 68,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    lineHeight: 18,
    fontSize: 13,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
    color: "black",
  },
  dateText: {      
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 10,
    paddingBottom: 16,
    paddingRight: 16,
    textAlign: 'right',
    color: '#BDBDBD',
  },
  keyboardOpen: {
    marginBottom: Platform.select({
      ios: 105, 
      android: 200, 
    }),
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    addComments: (comment) => dispatch(addComments(comment)),
  };
};

const mapStateToProps = (state) => ({
  comments: selectComments(state),
  currentUser: selectEmail(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
